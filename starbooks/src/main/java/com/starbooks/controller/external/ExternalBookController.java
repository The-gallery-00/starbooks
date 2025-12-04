// src/main/java/com/starbooks/controller/external/ExternalBookController.java
package com.starbooks.controller.external;

import com.starbooks.dto.external.BookDetailDto;
import com.starbooks.dto.external.BookSimpleDto;
import com.starbooks.service.external.BookExternalApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/external-books")
@RequiredArgsConstructor
public class ExternalBookController {

    private final BookExternalApiService bookExternalApiService;

    // 1) ISBN으로 도서 상세 조회
    @GetMapping("/detail")
    public ResponseEntity<BookDetailDto> getBookDetail(@RequestParam String isbn13) {
        BookDetailDto dto = bookExternalApiService.getBookDetailByIsbn(isbn13);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    // 2) 인기 도서 목록 (기간 검색)
    @GetMapping("/best")
    public ResponseEntity<List<BookSimpleDto>> getBestBooks(
            @RequestParam String startDt,   // "20250101"
            @RequestParam String endDt      // "20250131"
    ) {
        return ResponseEntity.ok(
                bookExternalApiService.getBestBooks(startDt, endDt)
        );
    }
}
