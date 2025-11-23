package com.starbooks.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationResponseDto {
    private Long notificationId;
    private Long userId;
    private String category;
    private String message;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
