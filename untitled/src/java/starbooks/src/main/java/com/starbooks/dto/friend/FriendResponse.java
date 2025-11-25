package java.starbooks.src.main.java.com.starbooks.dto.friend;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendResponse {
    private Long friendId;
    private Long requesterId;
    private Long receiverId;
    private String status; // PENDING, ACCEPTED, BLOCKED
}
