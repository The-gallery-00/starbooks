// src/main/java/com/starbooks/dto/bookshelf/BookshelfBookRequestDto.java
package com.starbooks.dto.bookshelf;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookshelfBookRequestDto {

    private Long shelfId;
    private Long bookId;
}
