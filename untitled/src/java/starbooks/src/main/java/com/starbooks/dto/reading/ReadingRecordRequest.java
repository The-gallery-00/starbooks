package java.starbooks.src.main.java.com.starbooks.dto.reading;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReadingRecordRequest {

    private Long bookId;

    private Integer rating;          // 별점(1~5 등)
    private String review;           // 도서평
    private String favoriteQuote;    // 좋아하는 구절

    private String readingStatus;    // PLANNING / READING / FINISHED / PAUSED
    private Integer progressPercent; // 진행률(0~100)

    private String startDate;        // yyyy-MM-dd
    private String endDate;          // yyyy-MM-dd
}

