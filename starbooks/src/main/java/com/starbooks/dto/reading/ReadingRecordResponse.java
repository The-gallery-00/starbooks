package com.starbooks.dto.reading;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadingRecordResponse {
    private Long recordId;
    private Long bookId;
    private Integer rating;
    private String review;
    private Integer progressPercent;
}
