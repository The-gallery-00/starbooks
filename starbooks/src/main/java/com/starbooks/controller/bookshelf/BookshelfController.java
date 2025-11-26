package com.starbooks.controller.bookshelf;

import com.starbooks.dto.bookshelf.*;
import com.starbooks.domain.bookshelf.*;
import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.service.bookshelf.BookshelfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookshelves")
@RequiredArgsConstructor
public class BookshelfController {

    private final BookshelfService service;
    private final UserRepository userRepo;
    private final BookRepository bookRepo;

    @PostMapping
    public ResponseEntity<BookshelfResponseDto> create(@RequestBody BookshelfRequestDto dto) {

        User user = userRepo.findById(dto.getUserId()).orElseThrow();

        Bookshelf shelf = Bookshelf.builder()
                .user(user)
                .shelfType(dto.getShelfType())
                .build();

        Bookshelf saved = service.create(shelf);

        return ResponseEntity.ok(BookshelfResponseDto.builder()
                .shelfId(saved.getShelfId())
                .userId(saved.getUser().getUserId())
                .shelfType(saved.getShelfType())
                .createdAt(saved.getCreatedAt())
                .build());
    }

    @PostMapping("/add-book")
    public ResponseEntity<?> addBook(@RequestBody BookshelfBookRequestDto dto) {

        BookshelfBook saved = service.addBook(dto.getShelfId(), dto.getBookId());

        return ResponseEntity.ok("Book added to shelf successfully!");
    }


    @GetMapping("/{id}")
    public ResponseEntity<BookshelfResponseDto> get(@PathVariable Long id) {
        Bookshelf shelf = service.findById(id);
        return ResponseEntity.ok(
                BookshelfResponseDto.builder()
                        .shelfId(shelf.getShelfId())
                        .userId(shelf.getUser().getUserId())
                        .shelfType(shelf.getShelfType())
                        .createdAt(shelf.getCreatedAt())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
