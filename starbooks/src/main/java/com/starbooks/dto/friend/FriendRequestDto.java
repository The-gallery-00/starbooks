package com.starbooks.dto.friend;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FriendRequestDto {
    private Long requesterId;
    private Long receiverId;
}
