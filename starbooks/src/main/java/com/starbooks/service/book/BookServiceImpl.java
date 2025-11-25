// com.starbooks.service.book.BookServiceImpl.java
package com.starbooks.service.book;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public Book create(Book b) {
        return bookRepository.save(b);
    }

    @Override
    public Book findById(Long id) {
        return bookRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book update(Long id, Book updated) {
        Book book = findById(id);
        book.setTitle(updated.getTitle());
        book.setDescription(updated.getDescription());
        book.setCategory(updated.getCategory());
        book.setCoverImage(updated.getCoverImage());
        return bookRepository.save(book);
    }

    @Override
    public void delete(Long id) {
        bookRepository.deleteById(id);
    }
}
