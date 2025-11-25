package java.starbooks.src.main.java.com.starbooks.dto.ranking;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SimpleRanking {
    private Long userId;
    private String nickname;
    private Integer score;
    private Integer rank;
}
