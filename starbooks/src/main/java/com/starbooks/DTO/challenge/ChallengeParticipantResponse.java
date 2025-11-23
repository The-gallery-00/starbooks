package com.starbooks.dto.challenge;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChallengeParticipantResponse {

    private Long participationId;
    private Long challengeId;
    private Long userId;

    private Integer progress;
    private Boolean isCompleted;

    private String joinedAt;
}
