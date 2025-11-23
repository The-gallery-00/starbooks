package com.starbooks.service.reading;

import com.starbooks.domain.reading.BookReview;
import com.starbooks.domain.reading.BookReviewRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.reading.BookReviewRequest;
import com.starbooks.dto.reading.BookReviewResponse;
import com.starbooks.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookReviewServiceImpl implements BookReviewService {

    private final UserRepository userRepository;
    private final BookReviewRepository bookReviewRepository;

    // -----------------------
    // 1. 리뷰 작성
    // -----------------------
    @Override
    public BookReviewResponse createReview(Long userId, BookReviewRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        BookReview review = BookReview.builder()
                .user(user)
                .bookId(request.getBookId())
                .rating(request.getRating())
                .content(request.getContent())
                .build();

        BookReview saved = bookReviewRepository.save(review);
        return toResponse(saved);
    }

    // -----------------------
    // 2. 책 기준 리뷰 조회
    // -----------------------
    @Override
    public List<BookReviewResponse> getReviewsByBook(Long bookId) {
        return bookReviewRepository.findByBookId(bookId)
                .stream().map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -----------------------
    // 3. 유저 기준 리뷰 조회
    // -----------------------
    @Override
    public List<BookReviewResponse> getReviewsByUser(Long userId) {
        return bookReviewRepository.findByUserId(userId)
                .stream().map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -----------------------
    // 4. 리뷰 삭제
    // -----------------------
    @Override
    public void deleteReview(Long userId, Long reviewId) {

        BookReview review = bookReviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Review not found"));

        if (!review.getUser().getUserId().equals(userId))
            throw new IllegalArgumentException("No permission to delete review");

        bookReviewRepository.delete(review);
    }

    private BookReviewResponse toResponse(BookReview r) {
        return BookReviewResponse.builder()
                .reviewId(r.getReviewId())
                .userId(r.getUser().getUserId())
                .bookId(r.getBookId())
                .rating(r.getRating())
                .content(r.getContent())
                .createdAt(r.getCreatedAt().toString())
                .updatedAt(r.getUpdatedAt().toString())
                .build();
    }
}
