package com.starbooks.dto.reading;

import lombok.Data;

@Data
public class ReadingRecordRequest {
    private Long bookId;
    private Integer rating;
    private String review;
    private String favoriteQuote;
    private Integer progressPercent;
}
