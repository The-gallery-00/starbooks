package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "friend_request")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    private String requesterId;
    private String receiverId;

    @Column(length = 20)
    private String status; // pending/accepted/rejected

    private LocalDateTime createdAt;
}
