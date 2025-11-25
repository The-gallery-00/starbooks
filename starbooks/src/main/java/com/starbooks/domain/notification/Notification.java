// com/starbooks/domain/notification/Notification.java
package com.starbooks.domain.notification;

import com.starbooks.domain.friend.Friendship;
import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications",
        indexes = {
                @Index(name = "idx_notifications_user", columnList = "user_id, is_read")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;   // 알림 받는 사람

    @ManyToOne
    @JoinColumn(name = "ref_friendship_id")
    private Friendship refFriendship;  // 친구 요청 알림일 경우

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotificationCategory category;

    @Column(nullable = false, length = 255)
    private String message;

    @Column(name = "is_read", columnDefinition = "TINYINT(1)")
    private Boolean isRead;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
