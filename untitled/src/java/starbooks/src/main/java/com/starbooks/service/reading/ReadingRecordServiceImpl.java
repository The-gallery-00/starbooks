package java.starbooks.src.main.java.com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingRecord;
import com.starbooks.domain.reading.ReadingRecordRepository;
import com.starbooks.domain.reading.ReadingStatus;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.reading.ReadingRecordRequest;
import com.starbooks.dto.reading.ReadingRecordResponse;
import java.starbooks.src.main.java.com.starbooks.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReadingRecordServiceImpl implements ReadingRecordService {

    private final UserRepository userRepository;
    private final ReadingRecordRepository readingRecordRepository;

    // -----------------------
    // 1. 기록 생성/수정 (Upsert)
    // -----------------------
    @Override
    public ReadingRecordResponse createOrUpdateRecord(Long userId, ReadingRecordRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found: " + userId));

        ReadingRecord record = readingRecordRepository.findByUserIdAndBookId(userId, request.getBookId())
                .orElse(ReadingRecord.builder()
                        .user(user)
                        .bookId(request.getBookId())
                        .build()
                );

        record.setRating(request.getRating());
        record.setReview(request.getReview());
        record.setFavoriteQuote(request.getFavoriteQuote());

        if (request.getReadingStatus() != null)
            record.setReadingStatus(ReadingStatus.valueOf(request.getReadingStatus()));

        record.setProgressPercent(request.getProgressPercent());

        if (request.getStartDate() != null)
            record.setStartDate(Date.valueOf(request.getStartDate()));

        if (request.getEndDate() != null)
            record.setEndDate(Date.valueOf(request.getEndDate()));

        ReadingRecord saved = readingRecordRepository.save(record);
        return toResponse(saved);
    }

    // -----------------------
    // 2. 특정 책 기록 조회
    // -----------------------
    @Override
    public ReadingRecordResponse getRecord(Long userId, Long bookId) {
        ReadingRecord record = readingRecordRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new NotFoundException("Reading record not found"));

        return toResponse(record);
    }

    // -----------------------
    // 3. 유저 전체 기록 조회
    // -----------------------
    @Override
    public List<ReadingRecordResponse> getUserRecords(Long userId) {
        return readingRecordRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -----------------------
    // 4. 기록 삭제
    // -----------------------
    @Override
    public void deleteRecord(Long userId, Long bookId) {
        ReadingRecord record = readingRecordRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new NotFoundException("Reading record not found"));

        readingRecordRepository.delete(record);
    }

    // -----------------------
    // 엔티티 → DTO 변환
    // -----------------------
    private ReadingRecordResponse toResponse(ReadingRecord r) {
        return ReadingRecordResponse.builder()
                .recordId(r.getRecordId())
                .userId(r.getUser().getUserId())
                .bookId(r.getBookId())
                .rating(r.getRating())
                .review(r.getReview())
                .favoriteQuote(r.getFavoriteQuote())
                .readingStatus(r.getReadingStatus().name())
                .progressPercent(r.getProgressPercent())
                .startDate(r.getStartDate() != null ? r.getStartDate().toString() : null)
                .endDate(r.getEndDate() != null ? r.getEndDate().toString() : null)
                .createdAt(r.getCreatedAt().toString())
                .updatedAt(r.getUpdatedAt().toString())
                .build();
    }
}
