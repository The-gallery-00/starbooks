package java.starbooks.src.main.java.com.starbooks.dto.goal;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoalResponse {
    private Long goalId;
    private Long userId;
    private Integer targetPages;
    private Integer currentPages;
    private String goalType;
    private Boolean isCompleted;
}
