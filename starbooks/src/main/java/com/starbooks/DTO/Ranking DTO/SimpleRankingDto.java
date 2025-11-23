package com.starbooks.domain.goal.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SimpleRankingDto {
    private Long userId;
    private String nickname;
    private Integer score;
    private Integer rank;
}
