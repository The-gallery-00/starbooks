package com.starbooks.service.bookshelf;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.bookshelf.Bookshelf;
import com.starbooks.domain.bookshelf.BookshelfBook;
import com.starbooks.domain.bookshelf.BookshelfBookId;
import com.starbooks.domain.bookshelf.BookshelfBookRepository;
import com.starbooks.domain.bookshelf.BookshelfRepository;
import com.starbooks.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookshelfServiceImpl implements BookshelfService {

    private final BookshelfRepository repository;
    private final BookRepository bookRepository;                      // ★ 추가
    private final BookshelfBookRepository bookshelfBookRepository;    // ★ 추가

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

    @Override
    public BookshelfBook addBook(Long shelfId, Long bookId) {

        Bookshelf shelf = repository.findById(shelfId)
                .orElseThrow(() -> new NotFoundException("Bookshelf not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("Book not found"));

        BookshelfBook bookshelfBook = BookshelfBook.builder()
                .id(new BookshelfBookId(shelfId, bookId))
                .bookshelf(shelf)
                .book(book)
                .addedAt(LocalDateTime.now())
                .build();

        return bookshelfBookRepository.save(bookshelfBook);
    }
}
