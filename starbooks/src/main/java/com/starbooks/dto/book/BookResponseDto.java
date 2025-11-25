// src/main/java/com/starbooks/dto/book/BookResponseDto.java
package com.starbooks.dto.book;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponseDto {

    private Long bookId;
    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private String category;
    private String description;
    private String coverImage;
    private LocalDate publishDate;
    private BigDecimal avgRating;
    private Integer reviewCount;
    private Boolean isPopular;
    private LocalDateTime createdAt;
}
