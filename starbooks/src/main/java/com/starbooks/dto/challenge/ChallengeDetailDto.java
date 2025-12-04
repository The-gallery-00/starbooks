// com/starbooks/dto/challenge/ChallengeDetailDto.java
package com.starbooks.dto.challenge;

import com.starbooks.domain.challenge.ChallengeStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class ChallengeDetailDto {
    private Long challengeId;
    private String title;
    private String description;
    private Integer targetBooks;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long creatorId;
    private ChallengeStatus status;
    private LocalDateTime createdAt;
    private Long participantCount;
}
