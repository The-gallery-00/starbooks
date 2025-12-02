package com.starbooks.dto.notification;

import com.starbooks.domain.notification.Notification;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationResponseDto {

    private Long notificationId;
    private Long userId;
    private String category;
    private String message;
    private Boolean isRead;
    private java.time.LocalDateTime createdAt;

    public static NotificationResponseDto from(Notification n) {
        return NotificationResponseDto.builder()
                .notificationId(n.getNotificationId())
                .userId(n.getUser().getUserId())
                .category(n.getCategory().name())
                .message(n.getMessage())
                .isRead(n.getIsRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}