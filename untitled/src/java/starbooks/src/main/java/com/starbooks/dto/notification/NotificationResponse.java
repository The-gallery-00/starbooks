package java.starbooks.src.main.java.com.starbooks.dto.notification;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationResponse {
    private Long notificationId;
    private Long userId;
    private String category;
    private String message;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
