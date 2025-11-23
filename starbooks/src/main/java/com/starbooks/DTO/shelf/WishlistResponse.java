package com.starbooks.dto.shelf;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WishlistResponse {

    private Long wishlistId;
    private Long userId;
    private Long bookId;
    private String createdAt;
}
