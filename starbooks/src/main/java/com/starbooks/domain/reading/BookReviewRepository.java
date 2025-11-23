package com.starbooks.domain.reading;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {

    List<BookReview> findByBookId(Long bookId);

    List<BookReview> findByUserId(Long userId);
}
