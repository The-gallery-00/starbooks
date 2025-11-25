// com.starbooks.service.book.BookService.java
package com.starbooks.service.book;

import com.starbooks.domain.book.Book;

import java.util.List;

public interface BookService {
    Book create(Book book);
    Book findById(Long id);
    List<Book> findAll();
    Book update(Long id, Book book);
    void delete(Long id);
}
