package com.starbooks.dto.favorite;

import com.starbooks.domain.favorite.Favorite;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FavoriteResponseDto {

    private Long favoriteId;
    private Long userId;
    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private LocalDateTime createdAt;

    public static FavoriteResponseDto from(Favorite favorite) {
        return FavoriteResponseDto.builder()
                .favoriteId(favorite.getFavoriteId())
                .userId(favorite.getUser().getUserId())
                .bookId(favorite.getBook().getBookId())
                .bookTitle(favorite.getBook().getTitle())
                .bookAuthor(favorite.getBook().getAuthor())
                .createdAt(favorite.getCreatedAt())
                .build();
    }
}
