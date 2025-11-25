package com.starbooks.service.shelf;

import com.starbooks.domain.shelf.*;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.shelf.BookshelfBookResponse;
import com.starbooks.dto.shelf.ShelfResponse;
import com.starbooks.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookshelfServiceImpl implements BookshelfService {

    private final UserRepository userRepository;
    private final BookshelfRepository bookshelfRepository;
    private final BookshelfBookRepository bookshelfBookRepository;

    // ------------------------------------
    // 1. 유저 기본 서재 생성
    // ------------------------------------
    @Override
    public void initializeBookshelf(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found: " + userId));

        // 이미 존재하면 무시
        if (!bookshelfRepository.findByUserId(userId).isEmpty())
            return;

        for (ShelfType type : ShelfType.values()) {
            Bookshelf shelf = Bookshelf.builder()
                    .user(user)
                    .shelfType(type)
                    .build();

            bookshelfRepository.save(shelf);
        }
    }

    // ------------------------------------
    // 2. 유저 서재 조회
    // ------------------------------------
    @Override
    public List<ShelfResponse> getUserShelves(Long userId) {
        List<Bookshelf> shelves = bookshelfRepository.findByUserId(userId);

        return shelves.stream()
                .map(s -> ShelfResponse.builder()
                        .shelfId(s.getShelfId())
                        .userId(userId)
                        .shelfType(s.getShelfType().name())
                        .build()
                )
                .collect(Collectors.toList());
    }

    // ------------------------------------
    // 3. 서재에 책 추가
    // ------------------------------------
    @Override
    public BookshelfBookResponse addBookToShelf(Long userId, Long bookId, String shelfType) {

        Bookshelf shelf = bookshelfRepository.findByUserIdAndShelfType(userId, ShelfType.valueOf(shelfType))
                .orElseThrow(() ->
                        new NotFoundException("Shelf not found: " + shelfType));

        BookshelfBook entity = BookshelfBook.builder()
                .shelf(shelf)
                .bookId(bookId)
                .build();

        BookshelfBook saved = bookshelfBookRepository.save(entity);

        return BookshelfBookResponse.builder()
                .shelfId(saved.getShelf().getShelfId())
                .bookId(saved.getBookId())
                .addedAt(saved.getAddedAt().toString())
                .build();
    }

    // ------------------------------------
    // 4. 서재에서 책 제거
    // ------------------------------------
    @Override
    public void removeBookFromShelf(Long userId, Long bookId, String shelfType) {

        Bookshelf shelf = bookshelfRepository.findByUserIdAndShelfType(userId, ShelfType.valueOf(shelfType))
                .orElseThrow(() -> new NotFoundException("Shelf not found"));

        BookshelfBookId id = new BookshelfBookId(shelf.getShelfId(), bookId);

        bookshelfBookRepository.deleteById(id);
    }

    // ------------------------------------
    // 5. 특정 서재의 도서 목록 조회
    // ------------------------------------
    @Override
    public List<BookshelfBookResponse> getBooksInShelf(Long userId, String shelfType) {

        Bookshelf shelf = bookshelfRepository.findByUserIdAndShelfType(userId, ShelfType.valueOf(shelfType))
                .orElseThrow(() -> new NotFoundException("Shelf not found"));

        List<BookshelfBook> list = bookshelfBookRepository.findByShelf(shelf);

        return list.stream()
                .map(b -> BookshelfBookResponse.builder()
                        .shelfId(b.getShelf().getShelfId())
                        .bookId(b.getBookId())
                        .addedAt(b.getAddedAt().toString())
                        .build())
                .collect(Collectors.toList());
    }
}
