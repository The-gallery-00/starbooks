// com.starbooks.domain.bookshelf.BookshelfRepository
package com.starbooks.domain.bookshelf;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookshelfRepository extends JpaRepository<Bookshelf, Long> {
}
