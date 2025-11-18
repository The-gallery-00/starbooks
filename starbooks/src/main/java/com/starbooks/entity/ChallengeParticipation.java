package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "challenge_participation")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class ChallengeParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participationId;

    private Long challengeId;

    private String userId;

    private Integer progress;
}
