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
}
