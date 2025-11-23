package com.starbooks.domain.goal.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
@Builder
public class ReadingCalendarResponseDto {
    private Long calendarId;
    private Long userId;
    private LocalDate date;
    private Integer pagesRead;
    private Boolean goalAchieved;
}
