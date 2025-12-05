// com.starbooks.controller.bookshelf.BookshelfController.java
package com.starbooks.controller.bookshelf;

import com.starbooks.domain.bookshelf.BookshelfBook;
import com.starbooks.dto.bookshelf.BookshelfRequestDto;
import com.starbooks.dto.bookshelf.BookshelfResponseDto;
import com.starbooks.service.bookshelf.BookshelfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookshelves")
@RequiredArgsConstructor
public class BookshelfController {

    private final BookshelfService service;

    /**
     * 📌 책을 내 서재에 추가 (READING / FINISHED / WISHLIST + 진척도)
     */
    @PostMapping("/add")
    public ResponseEntity<BookshelfResponseDto> addBookToShelf(
            @RequestBody BookshelfRequestDto dto
    ) {
        BookshelfBook saved = service.addBookToShelf(dto);
        return ResponseEntity.ok(BookshelfResponseDto.from(saved));
    }

    // 필요하면 나중에 shelf 자체를 조회/삭제하는 API 따로 다시 정리
}
