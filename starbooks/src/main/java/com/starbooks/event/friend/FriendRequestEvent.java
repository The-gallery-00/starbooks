// com.starbooks.event.friend.FriendRequestEvent
package com.starbooks.event.friend;

public record FriendRequestEvent(Long fromUserId, Long toUserId) {}
