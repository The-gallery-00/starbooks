// src/main/java/com/starbooks/dto/reading/ReadingRecordResponseDto.java
package com.starbooks.dto.reading;

import com.starbooks.domain.reading.ReadingStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingRecordResponseDto {

    private Long recordId;
    private Long userId;
    private Long bookId;
    private Integer rating;
    private String review;
    private String favoriteQuote;
    private ReadingStatus readingStatus;
    private Integer progressPercent;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
