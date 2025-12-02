package com.starbooks.domain.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    // 두 유저 사이에 이미 관계가 있는지 체크
    Optional<Friendship> findByRequesterUserIdAndReceiverUserId(Long requesterId, Long receiverId);

    // 친구 목록 가져오기 (수락된 친구)
    List<Friendship> findByRequesterUserIdAndStatus(Long userId, FriendshipStatus status);
    List<Friendship> findByReceiverUserIdAndStatus(Long userId, FriendshipStatus status);
}
