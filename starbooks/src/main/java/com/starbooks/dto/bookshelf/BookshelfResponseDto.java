// src/main/java/com/starbooks/dto/bookshelf/BookshelfResponseDto.java
package com.starbooks.dto.bookshelf;

import com.starbooks.domain.bookshelf.ShelfType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookshelfResponseDto {

    private Long shelfId;
    private Long userId;
    private ShelfType shelfType;
    private LocalDateTime createdAt;
}

