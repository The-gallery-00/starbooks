// com.starbooks.domain.book.BookRepository
package com.starbooks.domain.book;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
