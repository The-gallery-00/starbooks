package com.starbooks.service.auth;

import com.starbooks.dto.auth.AuthLoginRequest;
import com.starbooks.dto.auth.AuthLoginResponse;
import com.starbooks.dto.auth.AuthRegisterRequest;

public interface AuthService {

    AuthLoginResponse login(AuthLoginRequest request);

    // UserResponse → AuthLoginResponse로 통일하거나 UserResponse 유지 가능
    AuthLoginResponse register(AuthRegisterRequest request);
}
