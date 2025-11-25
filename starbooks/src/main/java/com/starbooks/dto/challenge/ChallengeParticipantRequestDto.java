// src/main/java/com/starbooks/dto/challenge/ChallengeParticipantRequestDto.java
package com.starbooks.dto.challenge;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeParticipantRequestDto {

    private Long challengeId;
    private Long userId;
}
