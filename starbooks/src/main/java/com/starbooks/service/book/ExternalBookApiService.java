package com.starbooks.service.book;

import com.starbooks.dto.book.BookDetailDto;
import com.starbooks.dto.book.BookSearchDto;
import java.util.List;

public interface ExternalBookApiService {

    // 검색 기능
    List<BookSearchDto> searchBooks(String keyword, int page, int size);

    // 상세 조회 기능
    BookDetailDto getBookDetail(String isbn);
}
