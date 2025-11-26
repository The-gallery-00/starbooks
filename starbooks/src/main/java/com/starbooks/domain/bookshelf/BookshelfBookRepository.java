package com.starbooks.domain.bookshelf;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookshelfBookRepository extends JpaRepository<BookshelfBook, BookshelfBookId> {
}
