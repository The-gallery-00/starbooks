package com.starbooks.domain.reading;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {

    // 특정 책에 대한 리뷰 전체 조회
    List<BookReview> findByBookBookId(Long bookId);

    // 특정 유저가 작성한 리뷰 전체 조회
    List<BookReview> findByUserUserId(Long userId);

    // 특정 유저가 특정 책에 작성한 리뷰 조회 (1개)
    BookReview findByUserUserIdAndBookBookId(Long userId, Long bookId);

    // 별점 순으로 정렬해서 가져오기
    List<BookReview> findByBookBookIdOrderByRatingDesc(Long bookId);

    // 최신순 정렬 리뷰
    List<BookReview> findByBookBookIdOrderByCreatedAtDesc(Long bookId);
}