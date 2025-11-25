// src/main/java/com/starbooks/dto/challenge/ChallengeResponseDto.java
package com.starbooks.dto.challenge;

import com.starbooks.domain.challenge.ChallengeStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeResponseDto {

    private Long challengeId;
    private String title;
    private String description;
    private Integer targetBooks;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long creatorId;
    private ChallengeStatus status;
    private LocalDateTime createdAt;
}
