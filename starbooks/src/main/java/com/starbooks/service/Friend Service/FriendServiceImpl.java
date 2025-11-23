package com.starbooks.service.friend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.starbooks.domain.friend.Friend;
import com.starbooks.domain.friend.FriendStatus;
import com.starbooks.repository.friend.FriendRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;

    @Override
    public Friend sendFriendRequest(Long requesterId, Long receiverId) {
        Friend friend = new Friend(requesterId, receiverId, FriendStatus.PENDING);
        return friendRepository.save(friend);
    }

    @Override
    public Friend acceptRequest(Long friendshipId, Long userId) {
        Friend friend = friendRepository.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found"));

        friend.accept(userId);
        return friend;
    }

    @Override
    public void removeFriend(Long friendshipId, Long userId) {
        Friend friend = friendRepository.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        friendRepository.delete(friend);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Friend> getFriends(Long userId) {
        return friendRepository.findFriendsByUserId(userId);
    }
}
