package com.starbooks.domain.challenge;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "challenge_participants",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_challenge_user",
                        columnNames = {"challenge_id", "user_id"})
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participation_id")
    private Long participationId;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer progress;

    @Column(name = "is_completed", columnDefinition = "TINYINT(1)")
    private Boolean isCompleted;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;
}
