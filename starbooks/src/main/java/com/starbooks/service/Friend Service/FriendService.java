package com.starbooks.service.friend;

import java.util.List;
import com.starbooks.domain.friend.Friend;

public interface FriendService {
    Friend sendFriendRequest(Long requesterId, Long receiverId);
    Friend acceptRequest(Long friendshipId, Long userId);
    void removeFriend(Long friendshipId, Long userId);
    List<Friend> getFriends(Long userId);
}
