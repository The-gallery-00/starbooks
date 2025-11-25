// com.starbooks.domain.bookshelf.BookshelfBookRepository
package com.starbooks.domain.bookshelf;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookshelfBookRepository<BookshelfBook> extends JpaRepository<BookshelfBook, BookshelfBookId> {
}
