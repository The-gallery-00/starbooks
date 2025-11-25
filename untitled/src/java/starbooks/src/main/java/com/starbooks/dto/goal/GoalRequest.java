package java.starbooks.src.main.java.com.starbooks.dto.goal;

import lombok.Getter;

@Getter
public class GoalRequest {
    private Integer targetPages;
    private String goalType;   // DAILY, MONTHLY 등
}
