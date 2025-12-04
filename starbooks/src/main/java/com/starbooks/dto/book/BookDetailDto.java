// com.starbooks.dto.book.BookDetailDto.java
package com.starbooks.dto.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDetailDto {
    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private String description;  // 책 소개
    private String coverImage;
}

