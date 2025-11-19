package com.starbooks.repository;

import com.starbooks.entity.BookShelf;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookShelfRepository extends JpaRepository<BookShelf, Long> {
}
