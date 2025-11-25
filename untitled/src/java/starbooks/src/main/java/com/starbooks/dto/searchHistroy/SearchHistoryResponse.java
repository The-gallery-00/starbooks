package java.starbooks.src.main.java.com.starbooks.dto.searchHistroy;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class SearchHistoryResponse {
    private Long searchId;
    private Long userId;
    private String keyword;
    private LocalDateTime searchedAt;
}
