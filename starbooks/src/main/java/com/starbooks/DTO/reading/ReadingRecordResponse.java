package com.starbooks.dto.reading;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReadingRecordResponse {

    private Long recordId;
    private Long userId;
    private Long bookId;

    private Integer rating;
    private String review;
    private String favoriteQuote;

    private String readingStatus;
    private Integer progressPercent;

    private String startDate;
    private String endDate;

    private String createdAt;
    private String updatedAt;
}
