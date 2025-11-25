package com.starbooks.domain.shelf;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookshelfBookRepository extends JpaRepository<BookshelfBook, BookshelfBookId> {

}
