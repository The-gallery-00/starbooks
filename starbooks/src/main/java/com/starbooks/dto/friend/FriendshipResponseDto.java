package com.starbooks.dto.friend;

import com.starbooks.domain.friend.FriendshipStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendshipResponseDto {
    private Long friendshipId;
    private FriendshipStatus status;
    private String message;
}
