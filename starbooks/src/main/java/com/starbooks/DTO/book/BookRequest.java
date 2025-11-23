package com.starbooks.dto.book;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BookRequest {

    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private String category;
    private String description;
    private String coverImage;
    private String publishDate; // "2024-01-01" 형태
}
