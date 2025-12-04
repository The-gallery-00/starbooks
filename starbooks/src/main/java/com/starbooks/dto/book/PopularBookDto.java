// src/main/java/com/starbooks/dto/book/PopularBookDto.java
package com.starbooks.dto.book;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PopularBookDto {
    private String isbn13;
    private String title;
    private String authors;
    private String publisher;
    private String pubYear;
    private int loanCnt;
    private String bookImageUrl;
}
