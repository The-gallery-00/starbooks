// src/main/java/com/starbooks/dto/book/BookRequestDto.java
package com.starbooks.dto.book;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequestDto {

    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private String category;
    private String description;
    private String coverImage;
    private LocalDate publishDate;
}
