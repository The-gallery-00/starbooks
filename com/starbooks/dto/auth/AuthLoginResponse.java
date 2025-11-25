package com.starbooks.dto.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthLoginResponse {

    private Long userId;
    private String username;
    private String nickname;

    private String accessToken;    // JWT Access Token
    private String refreshToken;   // JWT Refresh Token (선택)

    private String tokenType;      // "Bearer"
}
