// src/main/java/com/starbooks/dto/ranking/RankingResponseDto.java
package com.starbooks.dto.ranking;

import com.starbooks.domain.ranking.RankingType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankingResponseDto {

    private Long rankingId;
    private Long userId;
    private String nickname;
    private RankingType rankingType;
    private Integer rankPosition;
    private Integer value;
    private LocalDateTime calculatedAt;
}
