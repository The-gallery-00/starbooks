// src/main/java/com/starbooks/dto/goal/GoalResponseDto.java
package com.starbooks.dto.goal;

import com.starbooks.domain.goal.GoalType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalResponseDto {

    private Long goalId;
    private Long userId;
    private GoalType goalType;
    private Integer targetBooks;
    private Integer targetPages;
    private Integer achievedBooks;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime lastUpdated;
}
