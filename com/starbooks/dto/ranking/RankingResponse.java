package com.starbooks.dto.ranking;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RankingResponse {
    private String userId;
    private Integer rankPosition;
    private String rankType;
    private Integer value;
}
