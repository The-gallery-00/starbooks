package com.starbooks.dto.bookshelf;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BookshelfBookResponseDto {

    private Long shelfId;
    private Long bookId;
    private LocalDateTime addedAt;
}
