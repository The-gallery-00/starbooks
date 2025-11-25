package com.starbooks.service.shelf;

import com.starbooks.dto.shelf.WishlistResponse;

import java.util.List;

public interface WishlistService {

    WishlistResponse addToWishlist(Long userId, Long bookId);
    void removeFromWishlist(Long userId, Long bookId);
    List<WishlistResponse> getWishlist(Long userId);
}
