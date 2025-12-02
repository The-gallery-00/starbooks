package com.starbooks.service.friend;

import com.starbooks.domain.friend.Friendship;
import com.starbooks.domain.friend.FriendshipRepository;
import com.starbooks.domain.friend.FriendshipStatus;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    // 친구 요청 보내기
    public void sendFriendRequest(Long requesterId, Long receiverId) {

        if (requesterId.equals(receiverId)) {
            throw new IllegalArgumentException("자기 자신에게 친구요청은 불가능합니다.");
        }

        // 유저 존재 확인
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new IllegalArgumentException("요청자 없음"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("받는 사람 없음"));

        // 중복 요청 체크
        boolean exists = friendshipRepository
                .findByRequesterUserIdAndReceiverUserId(requesterId, receiverId)
                .isPresent();

        if (exists) {
            throw new IllegalArgumentException("이미 친구 요청 또는 관계가 존재합니다.");
        }

        Friendship friendship = Friendship.builder()
                .requester(requester)
                .receiver(receiver)
                .status(FriendshipStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        friendshipRepository.save(friendship);
    }

    // 친구 수락하기
    public void acceptFriendRequest(Long friendshipId) {
        Friendship friendship = friendshipRepository.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("친구 요청 없음"));

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendshipRepository.save(friendship);
    }

    // 친구 거절하기
    public void rejectFriendRequest(Long friendshipId) {
        Friendship friendship = friendshipRepository.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("친구 요청 없음"));

        friendship.setStatus(FriendshipStatus.REJECTED);
        friendshipRepository.save(friendship);
    }

    // 친구 목록 조회 (수락된 친구만)
    public List<Friendship> getFriends(Long userId) {
        List<Friendship> sent = friendshipRepository
                .findByRequesterUserIdAndStatus(userId, FriendshipStatus.ACCEPTED);

        List<Friendship> received = friendshipRepository
                .findByReceiverUserIdAndStatus(userId, FriendshipStatus.ACCEPTED);

        // 두 리스트 합치기
        sent.addAll(received);
        return sent;
    }
}
