// com.starbooks.controller.notification.NotificationController
package com.starbooks.controller.notification;

import com.starbooks.domain.notification.Notification;
import com.starbooks.domain.user.User;
import com.starbooks.dto.notification.NotificationResponseDto;
import com.starbooks.service.notification.NotificationService;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;
    private final UserRepository userRepository;

    // 특정 유저의 알림 목록 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponseDto>> getUserNotifications(
            @PathVariable Long userId
    ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> notifications = service.getUserNotifications(user);

        List<NotificationResponseDto> dtoList = notifications.stream()
                .map(NotificationResponseDto::from)
                .toList();

        return ResponseEntity.ok(dtoList);
    }

    // 알림 읽음 처리
    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markRead(@PathVariable Long id) {
        service.markRead(id);
        return ResponseEntity.ok().build();
    }
}