package com.starbooks.controller.user;

import com.starbooks.dto.user.*;
import com.starbooks.domain.user.User;
import com.starbooks.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> create(@RequestBody UserRequestDto dto) {
        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .passwordHash(dto.getPassword()) // 실무에선 Bcrypt 필수
                .nickname(dto.getNickname())
                .build();

        User saved = userService.create(user);

        return ResponseEntity.ok(
                UserResponseDto.builder()
                        .userId(saved.getUserId())
                        .username(saved.getUsername())
                        .email(saved.getEmail())
                        .nickname(saved.getNickname())
                        .role(saved.getRole())
                        .profileImage(saved.getProfileImage())
                        .intro(saved.getIntro())
                        .isActive(saved.getIsActive())
                        .createdAt(saved.getCreatedAt())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> get(@PathVariable Long id) {
        User user = userService.findById(id);

        return ResponseEntity.ok(
                UserResponseDto.builder()
                        .userId(user.getUserId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .nickname(user.getNickname())
                        .role(user.getRole())
                        .profileImage(user.getProfileImage())
                        .intro(user.getIntro())
                        .isActive(user.getIsActive())
                        .createdAt(user.getCreatedAt())
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> update(@PathVariable Long id,
                                                  @RequestBody UserUpdateRequestDto dto) {
        User updated = userService.update(id, User.builder()
                .nickname(dto.getNickname())
                .intro(dto.getIntro())
                .profileImage(dto.getProfileImage())
                .build());

        return ResponseEntity.ok(
                UserResponseDto.builder()
                        .userId(updated.getUserId())
                        .username(updated.getUsername())
                        .email(updated.getEmail())
                        .nickname(updated.getNickname())
                        .profileImage(updated.getProfileImage())
                        .intro(updated.getIntro())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
