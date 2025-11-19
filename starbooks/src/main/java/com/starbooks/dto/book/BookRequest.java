package com.starbooks.dto.book;

import lombok.Data;

@Data
public class BookRequest {
    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private String coverImage;
    private String description;
}
