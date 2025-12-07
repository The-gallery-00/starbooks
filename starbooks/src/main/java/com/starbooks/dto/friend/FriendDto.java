package com.starbooks.dto.friend;

import com.starbooks.domain.friend.FriendshipStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendDto {
    private Long friendshipId; // Friendship PK
    private Long friendId;     // 상대 userId
    private String friendNickname; // 상대 닉네임
    private FriendshipStatus status;
}

