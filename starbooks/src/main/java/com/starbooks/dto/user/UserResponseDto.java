// src/main/java/com/starbooks/dto/user/UserResponseDto.java
package com.starbooks.dto.user;

import com.starbooks.domain.user.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private Long userId;
    private String username;
    private String email;
    private String nickname;
    private User.Role role;
    private String profileImage;
    private String intro;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private Integer dailyPageGoal;
}
