package com.starbooks.dto.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PasswordResetRequestDto {
    private String username;
    private String email;
    private String newPassword;

}