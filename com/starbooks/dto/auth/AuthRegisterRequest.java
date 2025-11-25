package com.starbooks.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AuthRegisterRequest {

    private String username;
    private String email;
    private String password;
    private String nickname;
}
