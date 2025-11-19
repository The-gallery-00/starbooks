package com.starbooks.dto.notification;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationResponse {
    private Long notificationId;
    private String message;
    private boolean isRead;
}
