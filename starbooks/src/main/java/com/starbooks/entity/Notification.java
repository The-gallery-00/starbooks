package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private String userId;

    @Column(columnDefinition = "TEXT")
    private String message;

    private boolean isRead;

    private LocalDateTime createdAt;
}
