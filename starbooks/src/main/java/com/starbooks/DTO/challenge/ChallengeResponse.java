package com.starbooks.dto.challenge;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChallengeResponse {

    private Long challengeId;
    private String title;
    private String description;
    private Integer targetBooks;

    private String startDate;
    private String endDate;

    private Long creatorId;
    private String status;

    private String createdAt;
}
