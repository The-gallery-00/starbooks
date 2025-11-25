// src/main/java/com/starbooks/dto/user/UserUpdateRequestDto.java
package com.starbooks.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequestDto {

    private String nickname;
    private String intro;
    private String profileImage;
}
