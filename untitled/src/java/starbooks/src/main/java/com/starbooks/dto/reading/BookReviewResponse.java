package java.starbooks.src.main.java.com.starbooks.dto.reading;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookReviewResponse {

    private Long reviewId;
    private Long userId;
    private Long bookId;

    private Integer rating;
    private String content;

    private String createdAt;
    private String updatedAt;
}
