// com.starbooks.dto.auth.JwtResponse
package com.starbooks.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String tokenType;
    private Long expiresIn; // ms
    private UserInfo user;  // ⭐ 프론트가 원하는 user 정보

    @Getter
    @AllArgsConstructor
    public static class UserInfo {
        private Long id;
        private String username;
        private String email;
        private String nickname;
    }
}
