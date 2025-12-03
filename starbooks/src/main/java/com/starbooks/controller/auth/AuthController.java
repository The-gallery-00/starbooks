package com.starbooks.controller.auth;

import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.auth.*;
import com.starbooks.exception.BadRequestException;
import com.starbooks.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    private Long jwtUtilExpiration() {
        // JWT 만료시간(ms) – 지금은 1시간 예시
        return 3600000L;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new BadRequestException("Username already taken");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("Email already in use");
        }

        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .nickname(req.getNickname())
                .role(User.Role.USER) // assuming enum
                .build();

        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsernameOrEmail(),
                        req.getPassword()
                )
        );

        // Spring Security의 UserDetails
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

        String loginId = principal.getUsername(); // username 또는 email

        // 🔥 우리 DB의 User 엔티티 조회
        // usernameOrEmail 로 로그인하니까 둘 다 케이스 처리
        User user = userRepository.findByUsername(loginId)
                .orElseGet(() -> userRepository.findByEmail(loginId)
                        .orElseThrow(() -> new BadRequestException("User not found")));

        String role = principal.getAuthorities().stream()
                .findFirst()
                .map(Object::toString)
                .orElse("ROLE_USER");

        String token = jwtUtil.generateToken(principal.getUsername(), role);

        JwtResponse.UserInfo userInfo = new JwtResponse.UserInfo(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getNickname()
        );

        JwtResponse response = new JwtResponse(
                token,
                "Bearer",
                jwtUtilExpiration(),
                userInfo
        );

        return ResponseEntity.ok(response);

    }

}
