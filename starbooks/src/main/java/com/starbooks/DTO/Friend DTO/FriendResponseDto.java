package com.starbooks.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendResponseDto {
    private Long friendId;
    private Long requesterId;
    private Long receiverId;
    private String status; // PENDING, ACCEPTED, BLOCKED
}
