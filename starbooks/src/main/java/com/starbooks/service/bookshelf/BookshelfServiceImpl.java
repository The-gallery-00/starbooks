// com.starbooks.service.bookshelf.BookshelfServiceImpl.java
package com.starbooks.service.bookshelf;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.bookshelf.*;
import com.starbooks.domain.reading.ReadingStatus;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.bookshelf.BookshelfRequestDto;
import com.starbooks.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookshelfServiceImpl implements BookshelfService {

    private final BookshelfRepository repository;
    private final BookRepository bookRepository;
    private final BookshelfBookRepository bookshelfBookRepository;
    private final UserRepository userRepository;

    @Override
    public Bookshelf create(Bookshelf shelf) {
        return repository.save(shelf);
    }

    @Override
    public Bookshelf findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // ✅ 핵심 메서드
    @Override
    public BookshelfBook addBookToShelf(BookshelfRequestDto dto) {

        Long userId = dto.getUserId();
        Long bookId = dto.getBookId();
        ShelfType shelfType = dto.getShelfType();
        Integer currentPage = dto.getCurrentPage();
        Integer totalPages = dto.getTotalPages();

        // 1) 유저 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        // 2) 유저 + shelfType 으로 서재 찾거나 없으면 새로 생성
        Bookshelf shelf = repository
                .findByUserUserIdAndShelfType(userId, shelfType)
                .orElseGet(() -> repository.save(
                        Bookshelf.builder()
                                .user(user)
                                .shelfType(shelfType)
                                .build()
                ));

        // 3) 책 조회
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("Book not found"));

        // 4) ShelfType -> ReadingStatus 매핑
        ReadingStatus status;
        switch (shelfType) {
            case READING -> status = ReadingStatus.READING;
            case FINISHED -> status = ReadingStatus.FINISHED;
            case WISHLIST -> status = ReadingStatus.PLANNING; // 너가 WISHLIST 상태 따로 만들었으면 그걸로 변경
            default -> status = ReadingStatus.PLANNING;
        }

        // 5) progress 계산
        int progress = 0;
        Integer cur = currentPage;
        Integer total = totalPages;

        if (status == ReadingStatus.READING && cur != null && total != null && total > 0) {
            progress = (int) Math.round(cur * 100.0 / total);
        } else if (status == ReadingStatus.FINISHED && total != null) {
            progress = 100;
            cur = total; // 완독이면 현재 페이지 = 총 페이지
        }

        // 6) BookshelfBook 생성 및 저장
        BookshelfBook bookshelfBook = BookshelfBook.builder()
                .id(new BookshelfBookId(shelf.getShelfId(), bookId))
                .bookshelf(shelf)
                .book(book)
                .status(status)
                .currentPage(cur)
                .totalPage(total)
                .progress(progress)
                .addedAt(LocalDateTime.now())
                .build();

        return bookshelfBookRepository.save(bookshelfBook);
    }
}
