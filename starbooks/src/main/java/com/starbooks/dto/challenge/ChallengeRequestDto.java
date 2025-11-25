// src/main/java/com/starbooks/dto/challenge/ChallengeRequestDto.java
package com.starbooks.dto.challenge;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeRequestDto {

    private String title;
    private String description;
    private Integer targetBooks;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long creatorId;
}
