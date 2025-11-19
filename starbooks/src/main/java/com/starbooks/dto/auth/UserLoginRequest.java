package com.starbooks.dto.auth;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String email;
    private String password;
}
