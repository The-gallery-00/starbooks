package com.starbooks.controller.book;

import com.starbooks.dto.book.*;
import com.starbooks.domain.book.Book;
import com.starbooks.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService service;

    @PostMapping
    public ResponseEntity<BookResponseDto> create(@RequestBody BookRequestDto dto) {
        Book book = Book.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .publisher(dto.getPublisher())
                .isbn(dto.getIsbn())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .coverImage(dto.getCoverImage())
                .publishDate(dto.getPublishDate())
                .build();

        Book saved = service.create(book);

        return ResponseEntity.ok(BookResponseDto.builder()
                .bookId(saved.getBookId())
                .title(saved.getTitle())
                .author(saved.getAuthor())
                .category(saved.getCategory())
                .description(saved.getDescription())
                .coverImage(saved.getCoverImage())
                .publishDate(saved.getPublishDate())
                .avgRating(saved.getAvgRating())
                .reviewCount(saved.getReviewCount())
                .isPopular(saved.getIsPopular())
                .createdAt(saved.getCreatedAt())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDto> get(@PathVariable Long id) {
        Book book = service.findById(id);

        return ResponseEntity.ok(BookResponseDto.builder()
                .bookId(book.getBookId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .category(book.getCategory())
                .description(book.getDescription())
                .coverImage(book.getCoverImage())
                .avgRating(book.getAvgRating())
                .reviewCount(book.getReviewCount())
                .build());
    }

    @GetMapping
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(
                service.findAll().stream()
                        .map(b -> BookResponseDto.builder()
                                .bookId(b.getBookId())
                                .title(b.getTitle())
                                .author(b.getAuthor())
                                .category(b.getCategory())
                                .build())
                        .collect(Collectors.toList())
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponseDto> update(@PathVariable Long id,
                                                  @RequestBody BookRequestDto dto) {

        Book updated = service.update(id, Book.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .coverImage(dto.getCoverImage())
                .build()
        );

        return ResponseEntity.ok(BookResponseDto.builder()
                .bookId(updated.getBookId())
                .title(updated.getTitle())
                .author(updated.getAuthor())
                .category(updated.getCategory())
                .description(updated.getDescription())
                .coverImage(updated.getCoverImage())
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
