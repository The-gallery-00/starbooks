package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class User {

    @Id
    @Column(length = 50)
    private String userId;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 255)
    private String profileImage;

    private boolean isActive;

    private LocalDateTime createdAt;
}
