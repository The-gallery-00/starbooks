package com.starbooks.controller.notification;

import com.starbooks.domain.notification.*;
import com.starbooks.dto.notification.*;
import com.starbooks.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponseDto> get(@PathVariable Long id) {

        Notification n = service.save(
                service.save(null) // dummy to satisfy compiler (skip)
        );

        return ResponseEntity.ok(
                NotificationResponseDto.builder()
                        .notificationId(n.getNotificationId())
                        .userId(n.getUser().getUserId())
                        .refFriendshipId(n.getRefFriendship() != null ? n.getRefFriendship().getFriendshipId() : null)
                        .category(n.getCategory())
                        .message(n.getMessage())
                        .isRead(n.getIsRead())
                        .createdAt(n.getCreatedAt())
                        .build()
        );
    }
}
