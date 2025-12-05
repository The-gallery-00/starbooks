// com.starbooks.controller.book.BookSearchController.java
package com.starbooks.controller.book;

import com.starbooks.dto.book.BookDetailDto;
import com.starbooks.dto.book.BookSearchDto;
import com.starbooks.dto.book.PopularBookDto;
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

    @GetMapping("/popular-books")
    public ResponseEntity<List<PopularBookDto>> getPopularBooks(
            @RequestParam String startDt,          // 예: 2022-01-01
            @RequestParam String endDt,            // 예: 2022-03-31
            @RequestParam(required = false) String gender,   // "1" or "2"
            @RequestParam(required = false) String age,      // "20"
            @RequestParam(required = false) String region,   // "11;31"
            @RequestParam(required = false) String addCode,  // "0"
            @RequestParam(required = false) String kdc,      // "6"
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        List<PopularBookDto> list = externalBookApiService.getPopularBooks(
                startDt, endDt, gender, age, region, addCode, kdc, pageNo, pageSize
        );
        return ResponseEntity.ok(list);
    }

    // 1) 키워드로 검색
    @GetMapping("/books")
    public ResponseEntity<List<BookSearchDto>> searchBooks(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(externalBookApiService.searchBooks(keyword, page, size));
    }


    // 2) ISBN으로 상세 정보 조회
    @GetMapping("/book/detail")
    public ResponseEntity<BookDetailDto> getBookDetail(@RequestParam String isbn) {
        BookDetailDto detail = externalBookApiService.getBookDetail(isbn);
        return ResponseEntity.ok(detail);
    }
}
