package com.starbooks.service;

import com.starbooks.entity.Book;
import com.starbooks.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    public List<Book> search(String keyword) {
        return bookRepository.findAll().stream()
                .filter(book -> book.getTitle().contains(keyword))
                .toList();
    }
}
