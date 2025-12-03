package com.starbooks.domain.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    // 단방향 체크 (요청 여부)
    Optional<Friendship> findByRequesterUserIdAndReceiverUserId(Long requesterId, Long receiverId);

    // 친구 목록 조회
    List<Friendship> findByRequesterUserIdAndStatus(Long userId, FriendshipStatus status);
    List<Friendship> findByReceiverUserIdAndStatus(Long userId, FriendshipStatus status);

    // ⭐ 친구 삭제 및 특정 상태 확인을 위한 메서드
    Optional<Friendship> findByRequesterUserIdAndReceiverUserIdAndStatus(
            Long requesterId,
            Long receiverId,
            FriendshipStatus status
    );
}
