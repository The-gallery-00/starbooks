package java.starbooks.src.main.java.com.starbooks.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {

    private Long userId;
    private String username;
    private String email;
    private String nickname;
    private String role;
    private Boolean isActive;
    private String profileImage;
    private String intro;
}
