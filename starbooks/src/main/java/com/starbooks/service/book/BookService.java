package com.starbooks.service.book;

import com.starbooks.dto.book.BookRequest;
import com.starbooks.dto.book.BookResponse;
import java.util.List;

public interface BookService {

    BookResponse createBook(BookRequest request);       // 관리자: 도서 등록
    BookResponse getBook(Long bookId);                  // 도서 상세 조회
    List<BookResponse> searchBooks(String keyword);     // 검색
    List<BookResponse> getPopularBooks();               // 인기 도서 목록
}
