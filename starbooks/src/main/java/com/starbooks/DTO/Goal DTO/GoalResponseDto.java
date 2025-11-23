package com.starbooks.domain.goal.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoalResponseDto {
    private Long goalId;
    private Long userId;
    private Integer targetPages;
    private Integer currentPages;
    private String goalType;
    private Boolean isCompleted;
}
