package com.starbooks.dto.challenge;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChallengeResponse {
    private Long challengeId;
    private String title;
    private String description;
    private Integer targetBooks;
}
