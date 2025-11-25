package com.starbooks.service.auth;

import com.starbooks.domain.user.Role;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.auth.AuthLoginRequest;
import com.starbooks.dto.auth.AuthLoginResponse;
import com.starbooks.dto.auth.AuthRegisterRequest;
import com.starbooks.dto.user.UserRequest;
import com.starbooks.dto.user.UserResponse;
import com.starbooks.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoderService passwordEncoderService;

    // -----------------------
    // 1. 회원가입
    // -----------------------
    @Override
    public AuthLoginResponse register(AuthRegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        String encodedPassword = passwordEncoderService.encode(request.getPassword());

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(encodedPassword)
                .nickname(request.getNickname())
                .role(Role.USER)
                .isActive(true)
                .build();

        User saved = userRepository.save(user);

        return AuthLoginResponse.builder()
                .userId(saved.getUserId())
                .username(saved.getUsername())
                .nickname(saved.getNickname())
                .accessToken("WILL_BE_JWT")  // 다음 단계에서 JWT로 교체
                .tokenType("Bearer")
                .build();
    }


    // -----------------------
    // 2. 로그인
    // -----------------------
    @Override
    public AuthLoginResponse login(AuthLoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (!passwordEncoderService.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password");
        }

        return AuthLoginResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .accessToken("WILL_BE_JWT")
                .tokenType("Bearer")
                .build();
    }
}
