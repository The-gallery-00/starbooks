// com.starbooks.domain.book.BookReviewRepository
package com.starbooks.domain.book;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {
}
