package com.starbooks.dto.book;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookResponse {
    private Long bookId;
    private String title;
    private String author;
    private String publisher;
    private String coverImage;
    private String description;
}
