package com.starbooks.dto.reading;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BookReviewRequest {

    private Long bookId;
    private Integer rating;
    private String content;
}
