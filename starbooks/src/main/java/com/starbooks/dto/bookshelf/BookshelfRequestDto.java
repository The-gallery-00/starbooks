// src/main/java/com/starbooks/dto/bookshelf/BookshelfRequestDto.java
package com.starbooks.dto.bookshelf;

import com.starbooks.domain.bookshelf.ShelfType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookshelfRequestDto {

    private Long userId;
    private Long bookId;
    private ShelfType shelfType;  // READING, FINISHED, WISHLIST
    private Integer currentPage;  // READING일 때만 사용
    private Integer totalPages;
}
