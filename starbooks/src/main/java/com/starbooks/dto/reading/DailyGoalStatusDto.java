package com.starbooks.dto.reading;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyGoalStatusDto {
    private Integer targetPages;   // 일일 목표 페이지
    private Integer achievedPages; // 오늘 읽은 페이지
    private Boolean goalAchieved;  // 목표 달성 여부
}