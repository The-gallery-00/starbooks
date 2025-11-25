// src/main/java/com/starbooks/dto/goal/GoalRequestDto.java
package com.starbooks.dto.goal;

import com.starbooks.domain.goal.GoalType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalRequestDto {

    private Long userId;
    private GoalType goalType;
    private Integer targetBooks;
    private Integer targetPages;
    private LocalDate startDate;
    private LocalDate endDate;
}
