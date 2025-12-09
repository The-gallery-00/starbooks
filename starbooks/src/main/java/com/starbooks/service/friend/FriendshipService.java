package com.starbooks.service.friend;

import com.starbooks.domain.friend.Friendship;
import com.starbooks.domain.friend.FriendshipRepository;
import com.starbooks.domain.friend.FriendshipStatus;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.friend.FriendDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    // ------------------------------------
    // 1) 친구 요청 보내기
    // ------------------------------------
    public void sendFriendRequest(Long requesterId, Long receiverId) {

        if (requesterId.equals(receiverId)) {
            throw new IllegalArgumentException("자기 자신에게 친구요청은 불가능합니다.");
        }

        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new IllegalArgumentException("요청자 없음"));

        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("받는 사람 없음"));

        // 중복 관계 체크 (PENDING 또는 ACCEPTED 모두 포함)
        boolean exists =
                friendshipRepository.findByRequesterUserIdAndReceiverUserId(requesterId, receiverId).isPresent()
                        ||
                        friendshipRepository.findByRequesterUserIdAndReceiverUserId(receiverId, requesterId).isPresent();

        if (exists) {
            throw new IllegalArgumentException("이미 친구 요청 또는 관계가 존재합니다.");
        }

        Friendship fs = Friendship.builder()
                .requester(requester)
                .receiver(receiver)
                .status(FriendshipStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        friendshipRepository.save(fs);
    }


    // ------------------------------------
    // 2) 친구 요청 수락
    // ------------------------------------
    public void acceptFriendRequest(Long friendshipId) {
        Friendship friendship = friendshipRepository.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("친구 요청 없음"));

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendshipRepository.save(friendship);
    }


    // ------------------------------------
    // 3) 친구 요청 거절
    // ------------------------------------
    public void rejectFriendRequest(Long friendshipId) {
        Friendship friendship = friendshipRepository.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("친구 요청 없음"));

        friendship.setStatus(FriendshipStatus.REJECTED);
        friendshipRepository.save(friendship);
    }


    // ------------------------------------
    // 4) 친구 목록 조회
    // ------------------------------------
    public List<FriendDto> getFriends(Long userId) {
        List<Friendship> sent = friendshipRepository.findByRequesterUserIdAndStatus(userId, FriendshipStatus.ACCEPTED);
        List<Friendship> received = friendshipRepository.findByReceiverUserIdAndStatus(userId, FriendshipStatus.ACCEPTED);

        sent.addAll(received);

        return sent.stream().map(fs -> FriendDto.builder()
                .friendshipId(fs.getFriendshipId())
                .friendId(
                        fs.getRequester().getUserId().equals(userId)
                                ? fs.getReceiver().getUserId()
                                : fs.getRequester().getUserId()
                )
                .friendNickname(
                        fs.getRequester().getUserId().equals(userId)
                                ? fs.getReceiver().getNickname()
                                : fs.getRequester().getNickname()
                )
                .status(fs.getStatus())
                .build()
        ).toList();

    }


    // ------------------------------------
    // 5) 친구 삭제 (양방향, JDK 17 호환)
    // ------------------------------------
    public void removeFriend(Long userId, Long friendId) {

        // A→B or B→A 모두 조회 (ACCEPTED 상태만)
        Friendship fs =
                friendshipRepository.findByRequesterUserIdAndReceiverUserIdAndStatus(
                        userId, friendId, FriendshipStatus.ACCEPTED
                ).orElseGet(() ->
                        friendshipRepository.findByRequesterUserIdAndReceiverUserIdAndStatus(
                                friendId, userId, FriendshipStatus.ACCEPTED
                        ).orElseThrow(() ->
                                new IllegalArgumentException("이미 친구 관계가 아닙니다."))
                );

        friendshipRepository.delete(fs);
    }

    // ------------------------------------
    // 6) 내가 받은 친구 요청(PENDING) 조회
    // ------------------------------------
    public List<FriendDto> getPendingRequests(Long userId) {
    
        // 내가 받은 친구 요청만 조회
        List<Friendship> pending =
                friendshipRepository.findByReceiverUserIdAndStatus(userId, FriendshipStatus.PENDING);
    
        return pending.stream().map(fs -> FriendDto.builder()
                .friendshipId(fs.getFriendshipId())
                .friendId(fs.getRequester().getUserId()) // 요청 보낸 사람
                .friendNickname(fs.getRequester().getNickname())
                .status(fs.getStatus())
                .build()
        ).toList();
    }
}
