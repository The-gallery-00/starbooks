package com.starbooks.service.shelf;

import com.starbooks.dto.shelf.BookshelfBookResponse;
import com.starbooks.dto.shelf.ShelfResponse;

import java.util.List;

public interface BookshelfService {

    // 유저 기본 서재 생성 (READING, FINISHED, WISHLIST)
    void initializeBookshelf(Long userId);

    // 서재 조회
    List<ShelfResponse> getUserShelves(Long userId);

    // 책 서재에 추가
    BookshelfBookResponse addBookToShelf(Long userId, Long bookId, String shelfType);

    // 서재에서 책 제거
    void removeBookFromShelf(Long userId, Long bookId, String shelfType);

    // 특정 서재의 도서 목록 조회
    List<BookshelfBookResponse> getBooksInShelf(Long userId, String shelfType);
}
