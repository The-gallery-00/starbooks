package com.starbooks.dto.bookshelf;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookshelfBookRequestDto {

    private Long shelfId;   // 어떤 서재인지
    private Long bookId;    // 어떤 책인지
}
