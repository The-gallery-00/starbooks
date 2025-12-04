// com.starbooks.dto.book.BookSearchDto.java
package com.starbooks.dto.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookSearchDto {
    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private String publicationYear;
    private String bookImageUrl;
}
