package com.starbooks.service.book;

import com.starbooks.dto.book.BookDetailDto;
import com.starbooks.dto.book.BookSearchDto;
import com.starbooks.dto.book.PopularBookDto;

import java.util.List;

public interface ExternalBookApiService {

    // 검색 기능
    List<BookSearchDto> searchBooks(String keyword, int page, int size);

    // 상세 조회 기능
    BookDetailDto getBookDetail(String isbn);

    List<PopularBookDto> getPopularBooks(
            String startDt,
            String endDt,
            String gender,   // "1", "2" 같은 문자열
            String age,      // "20" 이런 식
            String region,   // "11;31" 이런 식
            String addCode,  // "0"
            String kdc,      // "6"
            Integer pageNo,
            Integer pageSize
    );
}
