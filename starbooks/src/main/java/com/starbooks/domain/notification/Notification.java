package com.starbooks.domain.notification;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;    // 알림 대상 유저

    @Enumerated(EnumType.STRING)
    private NotificationCategory category; // SYSTEM, FRIEND, CHALLENGE, COMMUNITY

    private String message;

    private Boolean isRead;
}
