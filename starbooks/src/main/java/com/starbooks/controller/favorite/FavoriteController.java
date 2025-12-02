package com.starbooks.controller.favorite;

import com.starbooks.dto.favorite.FavoriteRequestDto;
import com.starbooks.dto.favorite.FavoriteResponseDto;
import com.starbooks.service.favorite.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<FavoriteResponseDto> addFavorite(@RequestBody FavoriteRequestDto requestDto) {
        return ResponseEntity.ok(favoriteService.addFavorite(requestDto));
    }

    @DeleteMapping
    public ResponseEntity<Void> removeFavorite(@RequestBody FavoriteRequestDto requestDto) {
        favoriteService.removeFavorite(requestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteResponseDto>> getUserFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getUserFavorites(userId));
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFavorite(@RequestParam Long userId,
                                              @RequestParam Long bookId) {
        return ResponseEntity.ok(favoriteService.isFavorite(userId, bookId));
    }
}
