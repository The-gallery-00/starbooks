package com.starbooks.domain.challenge;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "challenge_participants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer progress; // 달성 수치 (책 읽은 권수 등)

    private Boolean isCompleted; // 목표 달성 여부

    @Column(name = "joined_at", updatable = false)
    private LocalDateTime joinedAt;  // ← ★ 서비스에서 사용하는 필드

    @PrePersist
    public void prePersist() {
        this.joinedAt = LocalDateTime.now();
    }
}
