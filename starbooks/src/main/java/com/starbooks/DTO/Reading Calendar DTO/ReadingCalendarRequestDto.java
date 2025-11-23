package com.starbooks.domain.goal.dto;

import lombok.Getter;
import java.time.LocalDate;

@Getter
public class ReadingCalendarRequestDto {
    private LocalDate date;
    private Integer pagesRead;
}
