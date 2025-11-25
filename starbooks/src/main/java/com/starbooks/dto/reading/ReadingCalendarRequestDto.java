// src/main/java/com/starbooks/dto/reading/ReadingCalendarRequestDto.java
package com.starbooks.dto.reading;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingCalendarRequestDto {

    private Long userId;
    private LocalDate readingDate;
    private Integer pagesRead;
    private Boolean goalAchieved;
    private String progressNote;
}
