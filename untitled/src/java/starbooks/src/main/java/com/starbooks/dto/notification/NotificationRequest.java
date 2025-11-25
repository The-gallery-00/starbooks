package java.starbooks.src.main.java.com.starbooks.dto.notification;

import lombok.Getter;

@Getter
public class NotificationRequest {
    private Long userId;
    private String category;
    private String message;
}
