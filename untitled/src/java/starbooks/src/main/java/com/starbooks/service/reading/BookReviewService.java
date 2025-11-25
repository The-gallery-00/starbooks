package java.starbooks.src.main.java.com.starbooks.service.reading;

import com.starbooks.dto.reading.BookReviewRequest;
import com.starbooks.dto.reading.BookReviewResponse;

import java.util.List;

public interface BookReviewService {

    BookReviewResponse createReview(Long userId, BookReviewRequest request);

    List<BookReviewResponse> getReviewsByBook(Long bookId);

    List<BookReviewResponse> getReviewsByUser(Long userId);

    void deleteReview(Long userId, Long reviewId);
}
