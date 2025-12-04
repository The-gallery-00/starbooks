// com.starbooks.controller.book.BookSearchController.java
package com.starbooks.controller.book;

import com.starbooks.dto.book.BookDetailDto;
import com.starbooks.dto.book.BookSearchDto;
import com.starbooks.service.book.ExternalBookApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class BookSearchController {

    private final ExternalBookApiService externalBookApiService;

    // 1) 키워드로 검색
    @GetMapping("/books")
    public ResponseEntity<List<BookSearchDto>> searchBooks(@RequestParam String keyword, int page, int size) {
        List<BookSearchDto> result = externalBookApiService.searchBooks(keyword, page, size);
        return ResponseEntity.ok(result);
    }

    // 2) ISBN으로 상세 정보 조회
    @GetMapping("/book/detail")
    public ResponseEntity<BookDetailDto> getBookDetail(@RequestParam String isbn) {
        BookDetailDto detail = externalBookApiService.getBookDetail(isbn);
        return ResponseEntity.ok(detail);
    }
}
