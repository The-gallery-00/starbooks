package java.starbooks.src.main.java.com.starbooks.dto.ranking;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RankingResponse {
    private Long rankingId;
    private Long userId;
    private Integer score;        // 읽은 페이지 수 등
    private Integer rank;         // 순위
    private String rankingType;   // DAILY, WEEKLY, MONTHLY
}
