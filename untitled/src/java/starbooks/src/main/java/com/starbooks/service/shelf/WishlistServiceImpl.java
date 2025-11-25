package java.starbooks.src.main.java.com.starbooks.service.shelf;

import com.starbooks.domain.shelf.WishlistItem;
import com.starbooks.domain.shelf.WishlistItemRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.shelf.WishlistResponse;
import java.starbooks.src.main.java.com.starbooks.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final UserRepository userRepository;
    private final WishlistItemRepository wishlistRepository;

    // -----------------------
    // 찜 추가
    // -----------------------
    @Override
    public WishlistResponse addToWishlist(Long userId, Long bookId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        WishlistItem item = WishlistItem.builder()
                .user(user)
                .bookId(bookId)
                .build();

        WishlistItem saved = wishlistRepository.save(item);

        return toResponse(saved);
    }

    // -----------------------
    // 찜 제거
    // -----------------------
    @Override
    public void removeFromWishlist(Long userId, Long bookId) {
        wishlistRepository.deleteByUserIdAndBookId(userId, bookId);
    }

    // -----------------------
    // 내 찜목록 조회
    // -----------------------
    @Override
    public List<WishlistResponse> getWishlist(Long userId) {

        List<WishlistItem> items = wishlistRepository.findByUserId(userId);

        return items.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private WishlistResponse toResponse(WishlistItem item) {
        return WishlistResponse.builder()
                .wishlistId(item.getWishlistId())
                .userId(item.getUser().getUserId())
                .bookId(item.getBookId())
                .createdAt(item.getCreatedAt().toString())
                .build();
    }
}
