package java.starbooks.src.main.java.com.starbooks.dto.community;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommunityPostRequest {

    private Long bookId;          // Optional
    private String postType;      // QUIZ / POLL / DISCUSSION
    private String title;
    private String content;
}
