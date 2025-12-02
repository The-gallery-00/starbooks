package com.starbooks.service.favorite;

import com.starbooks.dto.favorite.FavoriteRequestDto;
import com.starbooks.dto.favorite.FavoriteResponseDto;
import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.favorite.Favorite;
import com.starbooks.domain.favorite.FavoriteRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    // 도서 찜하기
    public FavoriteResponseDto addFavorite(FavoriteRequestDto request) {

        // 이미 찜했는지 체크
        if (favoriteRepository.existsByUserUserIdAndBookBookId(request.getUserId(), request.getBookId())) {
            throw new IllegalArgumentException("이미 찜한 도서입니다.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("도서를 찾을 수 없습니다."));

        Favorite favorite = Favorite.builder()
                .user(user)
                .book(book)
                .build();

        Favorite saved = favoriteRepository.save(favorite);
        return FavoriteResponseDto.from(saved);
    }

    // 도서 찜 해제
    public void removeFavorite(FavoriteRequestDto request) {

        Favorite favorite = favoriteRepository.findByUserUserIdAndBookBookId(
                        request.getUserId(),
                        request.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("찜한 기록이 없습니다."));

        favoriteRepository.delete(favorite);
    }

    // 특정 유저의 찜 리스트 조회
    @Transactional(readOnly = true)
    public List<FavoriteResponseDto> getUserFavorites(Long userId) {
        return favoriteRepository.findByUserUserId(userId).stream()
                .map(FavoriteResponseDto::from)
                .toList();
    }

    // 특정 책을 찜했는지 여부 확인 (프론트에서 하트 색깔 표시용)
    @Transactional(readOnly = true)
    public boolean isFavorite(Long userId, Long bookId) {
        return favoriteRepository.existsByUserUserIdAndBookBookId(userId, bookId);
    }
}
