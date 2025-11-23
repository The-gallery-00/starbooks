package com.starbooks.domain.goal.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RankingResponseDto {
    private Long rankingId;
    private Long userId;
    private Integer score;        // 읽은 페이지 수 등
    private Integer rank;         // 순위
    private String rankingType;   // DAILY, WEEKLY, MONTHLY
}
