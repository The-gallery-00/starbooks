package com.starbooks.dto.reading;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ReadingCalendarDayDto {
    private LocalDate date;
    private Boolean goalAchieved;
    private Integer pagesRead;
}
