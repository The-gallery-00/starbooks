package com.starbooks.controller.reading;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.user.User;
import com.starbooks.domain.reading.*;
import com.starbooks.dto.reading.*;
import com.starbooks.service.reading.ReadingCalendarService;
import com.starbooks.service.reading.ReadingRecordService;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reading-records")
@RequiredArgsConstructor
public class ReadingRecordController {

    private final ReadingRecordService service;
    private final UserRepository userRepo;
    private final BookRepository bookRepo;
    private final ReadingRecordService readingRecordService;
    private final ReadingCalendarService readingCalendarService;

    @PostMapping
    public ResponseEntity<ReadingRecordResponseDto> create(@RequestBody ReadingRecordRequestDto dto) {

        User user = userRepo.findById(dto.getUserId()).orElseThrow();
        Book book = bookRepo.findById(dto.getBookId()).orElseThrow();

        ReadingRecord record = ReadingRecord.builder()
                .user(user)
                .book(book)
                .rating(dto.getRating())
                .review(dto.getReview())
                .favoriteQuote(dto.getFavoriteQuote())
                .readingStatus(dto.getReadingStatus())
                .progressPercent(dto.getProgressPercent())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();

        ReadingRecord saved = service.save(record);

        return ResponseEntity.ok(ReadingRecordResponseDto.builder()
                .recordId(saved.getRecordId())
                .userId(saved.getUser().getUserId())
                .bookId(saved.getBook().getBookId())
                .rating(saved.getRating())
                .review(saved.getReview())
                .favoriteQuote(saved.getFavoriteQuote())
                .readingStatus(saved.getReadingStatus())
                .progressPercent(saved.getProgressPercent())
                .startDate(saved.getStartDate())
                .endDate(saved.getEndDate())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build());
    }

    @GetMapping("/{recordId}")
    public ResponseEntity<ReadingRecordResponseDto> get(@PathVariable Long recordId) {
        ReadingRecord r = service.find(recordId);

        return ResponseEntity.ok(ReadingRecordResponseDto.builder()
                .recordId(r.getRecordId())
                .userId(r.getUser().getUserId())
                .bookId(r.getBook().getBookId())
                .review(r.getReview())
                .favoriteQuote(r.getFavoriteQuote())
                .readingStatus(r.getReadingStatus())
                .progressPercent(r.getProgressPercent())
                .createdAt(r.getCreatedAt())
                .updatedAt(r.getUpdatedAt())
                .build());
    }

    @DeleteMapping("/{recordId}")
    public ResponseEntity<Void> delete(@PathVariable Long recordId) {
        service.delete(recordId);
        return ResponseEntity.noContent().build();
    }

    // ⭐ 오늘 읽은 페이지 + 목표 달성 체크 + 캘린더 저장 + JSON 반환
    @PatchMapping("/{userId}/today-pages")
    public ResponseEntity<ReadingProgressResponseDto> updateTodayPages(
            @PathVariable Long userId,
            @RequestParam Integer pagesRead
    ) {
        // ⭐ 오늘 기록 갱신 (오늘 누적 페이지 리턴)
        ReadingCalendar updated = readingCalendarService
                .updateDailyProgress(userId, LocalDate.now(), pagesRead);

        int updatedTodayPages = updated.getPagesRead() == null ? 0 : updated.getPagesRead();

        // ⭐ 목표 페이지 가져오기 (숫자로 반환한다고 했으므로)
        int dailyGoal = userRepo.findById(userId)
                .map(User::getDailyPageGoal)
                .orElse(0);

        // ⭐ 목표 달성 여부 체크 (원하면 추가 동작 가능)
        boolean goalReached = (dailyGoal > 0 && updatedTodayPages >= dailyGoal);

        // 👇 프론트가 그대로 setGoalData(res.data) 사용 가능
        ReadingProgressResponseDto response =
                new ReadingProgressResponseDto(dailyGoal, updatedTodayPages);

        return ResponseEntity.ok(response);
    }


    // 오늘 읽은 페이지 조회 (GET)
    @GetMapping("/{userId}/today-pages")
    public ResponseEntity<Integer> getTodayPages(@PathVariable Long userId) {

        int pagesReadToday = readingCalendarService
                .findByUserAndDate(userId, LocalDate.now())
                .map(c -> c.getPagesRead() == null ? 0 : c.getPagesRead())
                .orElse(0);

        return ResponseEntity.ok(pagesReadToday);
    }
}
