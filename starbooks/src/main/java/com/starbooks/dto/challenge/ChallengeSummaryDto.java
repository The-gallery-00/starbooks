// com/starbooks/dto/challenge/ChallengeSummaryDto.java
package com.starbooks.dto.challenge;

import com.starbooks.domain.challenge.ChallengeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeSummaryDto {
    private Long challengeId;
    private String title;
    private ChallengeStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer targetBooks;
    private Long participantCount;
}
