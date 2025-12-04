package com.starbooks.service.favorite;

import com.starbooks.dto.favorite.FavoriteRequestDto;
import com.starbooks.dto.favorite.FavoriteResponseDto;
import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.favorite.Favorite;
import com.starbooks.domain.favorite.FavoriteRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.service.book.ExternalBookApiService;   // ⭐ 추가
import com.starbooks.dto.book.BookDetailDto;
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
    private final ExternalBookApiService externalBookApiService; // ⭐ 추가

    // 도서 찜하기
    // 도서 찜하기
    public FavoriteResponseDto addFavorite(FavoriteRequestDto request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 1️⃣ 먼저 Book을 구한다 (bookId 또는 isbn 기준)
        Book book;
        if (request.getBookId() != null) {
            // 기존 방식: DB에 이미 있는 책
            book = bookRepository.findById(request.getBookId())
                    .orElseThrow(() -> new IllegalArgumentException("도서를 찾을 수 없습니다."));
        } else if (request.getIsbn() != null && !request.getIsbn().isBlank()) {
            // 새 방식: isbn으로만 넘어온 경우 (도서관 정보나루 검색 결과에서 바로 찜)
            book = bookRepository.findByIsbn(request.getIsbn())
                    .orElseGet(() -> {
                        // DB에 없으면 외부 API에서 상세정보 가져와 새로 저장
                        BookDetailDto detail = externalBookApiService.getBookDetail(request.getIsbn());
                        if (detail == null) {
                            throw new IllegalArgumentException("도서 상세 정보를 가져올 수 없습니다.");
                        }
                        Book newBook = Book.builder()
                                .isbn(detail.getIsbn())
                                .title(detail.getTitle())
                                .author(detail.getAuthor())
                                .publisher(detail.getPublisher())
                                .description(detail.getDescription())
                                .coverImage(detail.getCoverImage())
                                // publishDate 변환 필요하면 여기에서 LocalDate로 파싱
                                .build();
                        return bookRepository.save(newBook);
                    });
        } else {
            throw new IllegalArgumentException("bookId 또는 isbn이 필요합니다.");
        }

        // 2️⃣ 이미 찜했는지 체크
        if (favoriteRepository.existsByUserUserIdAndBookBookId(user.getUserId(), book.getBookId())) {
            throw new IllegalArgumentException("이미 찜한 도서입니다.");
        }

        // 3️⃣ 찜 저장
        Favorite favorite = Favorite.builder()
                .user(user)
                .book(book)
                .build();

        Favorite saved = favoriteRepository.save(favorite);
        return FavoriteResponseDto.from(saved);
    }


    // 도서 찜 해제
    public void removeFavorite(FavoriteRequestDto request) {

        Long userId = request.getUserId();
        Long bookId = request.getBookId();

        if (bookId == null && request.getIsbn() != null) {
            // isbn만 넘어온 경우 bookId를 찾아온다
            Book book = bookRepository.findByIsbn(request.getIsbn())
                    .orElseThrow(() -> new IllegalArgumentException("도서를 찾을 수 없습니다."));
            bookId = book.getBookId();
        }

        Favorite favorite = favoriteRepository
                .findByUserUserIdAndBookBookId(userId, bookId)
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
