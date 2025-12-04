// src/main/java/com/starbooks/dto/external/BookSimpleDto.java
package com.starbooks.dto.external;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookSimpleDto {
    private String title;
    private String author;
    private String isbn13;
    private String bookImageUrl;
}
