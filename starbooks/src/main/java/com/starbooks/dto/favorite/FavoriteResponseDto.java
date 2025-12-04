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

    private String title;
    private String author;
    private String publisher;
    private String coverImage;

    private LocalDateTime createdAt;

    public static FavoriteResponseDto from(Favorite favorite) {

        return FavoriteResponseDto.builder()
                .favoriteId(favorite.getFavoriteId())
                .userId(favorite.getUser().getUserId())
                .bookId(favorite.getBook().getBookId())
                .title(favorite.getBook().getTitle())
                .author(favorite.getBook().getAuthor())
                .publisher(favorite.getBook().getPublisher())
                .coverImage(favorite.getBook().getCoverImage())
                .createdAt(favorite.getCreatedAt())
                .build();
    }
}
