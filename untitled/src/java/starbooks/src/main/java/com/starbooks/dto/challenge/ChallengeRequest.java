package java.starbooks.src.main.java.com.starbooks.dto.challenge;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChallengeRequest {
    private String title;
    private String description;
    private Integer targetBooks;
    private String startDate;     // yyyy-MM-dd
    private String endDate;       // yyyy-MM-dd
    private Long creatorId;       // User ID
}
