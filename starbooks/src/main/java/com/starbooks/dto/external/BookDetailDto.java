// src/main/java/com/starbooks/dto/external/BookDetailDto.java
package com.starbooks.dto.external;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDetailDto {
    private String title;
    private String author;
    private String publisher;
    private String pubYear;
    private String isbn13;
    private String bookImageUrl;
    private String description; // 간단 소개
}
