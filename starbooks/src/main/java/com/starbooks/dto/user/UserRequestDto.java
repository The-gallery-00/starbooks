// src/main/java/com/starbooks/dto/user/UserRequestDto.java
package com.starbooks.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDto {

    private String username;
    private String email;
    private String password;      // 평문 비밀번호 (서비스에서 hash)
    private String nickname;
}
