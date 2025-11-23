package com.starbooks.domain.goal.dto;

import lombok.Getter;

@Getter
public class GoalRequestDto {
    private Integer targetPages;
    private String goalType;   // DAILY, MONTHLY 등
}
