package com.starbooks.dto.favorite;

import lombok.Data;

@Data
public class FavoriteRequestDto {
    private Long userId;
    private Long bookId;
    private String isbn;
}
