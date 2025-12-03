package com.starbooks.controller.reading;

import com.starbooks.domain.reading.ReadingRecord;
import com.starbooks.dto.reading.ReadingRecordResponseDto;
import com.starbooks.service.reading.ReadingRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
public class UserLibraryController {

    private final ReadingRecordService readingRecordService;

    // ⭐ 다른 사람 서재 열람 API
    @GetMapping("/{userId}")
    public ResponseEntity<List<ReadingRecordResponseDto>> getUserLibrary(
            @PathVariable Long userId
    ) {
        List<ReadingRecord> records = readingRecordService.findByUserId(userId);

        List<ReadingRecordResponseDto> result = records.stream()
                .map(r -> ReadingRecordResponseDto.builder()
                        .recordId(r.getRecordId())
                        .userId(r.getUser().getUserId())
                        .bookId(r.getBook().getBookId())
                        .rating(r.getRating())
                        .review(r.getReview())
                        .favoriteQuote(r.getFavoriteQuote())
                        .readingStatus(r.getReadingStatus())
                        .currentPage(r.getCurrentPage())
                        .progressPercent(r.getProgressPercent())
                        .startDate(r.getStartDate())
                        .endDate(r.getEndDate())
                        .createdAt(r.getCreatedAt())
                        .updatedAt(r.getUpdatedAt())
                        .build()
                ).toList();

        return ResponseEntity.ok(result);
    }
}
