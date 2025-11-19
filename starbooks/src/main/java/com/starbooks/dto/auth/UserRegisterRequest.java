package com.starbooks.dto.auth;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private String email;
    private String password;
    private String nickname;
}
