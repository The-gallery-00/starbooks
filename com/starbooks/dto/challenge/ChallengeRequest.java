package com.starbooks.dto.challenge;

import lombok.Data;

@Data
public class ChallengeRequest {
    private String title;
    private String description;
    private Integer targetBooks;
}
