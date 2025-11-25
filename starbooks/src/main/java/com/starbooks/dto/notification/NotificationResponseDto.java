// src/main/java/com/starbooks/dto/notification/NotificationResponseDto.java
package com.starbooks.dto.notification;

import com.starbooks.domain.notification.NotificationCategory;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponseDto {

    private Long notificationId;
    private Long userId;
    private Long refFriendshipId;
    private NotificationCategory category;
    private String message;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
