// src/main/java/com/starbooks/dto/challenge/ChallengeParticipantResponseDto.java
package com.starbooks.dto.challenge;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeParticipantResponseDto {

    private Long participationId;
    private Long challengeId;
    private Long userId;
    private Integer progress;
    private Boolean isCompleted;
    private LocalDateTime joinedAt;
}
