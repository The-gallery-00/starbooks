// src/main/java/com/starbooks/dto/reading/ReadingCalendarResponseDto.java
package com.starbooks.dto.reading;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingCalendarResponseDto {

    private Long calendarId;
    private Long userId;
    private LocalDate readingDate;
    private Integer pagesRead;
    private Boolean goalAchieved;
    private String progressNote;
}
