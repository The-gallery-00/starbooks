// src/main/java/com/starbooks/dto/reading/ReadingRecordRequestDto.java
package com.starbooks.dto.reading;

import com.starbooks.domain.reading.ReadingStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingRecordRequestDto {

    private Long userId;
    private Long bookId;
    private Integer rating;
    private String review;
    private String favoriteQuote;
    private ReadingStatus readingStatus;
    private Integer progressPercent;
    private LocalDate startDate;
    private LocalDate endDate;
}
