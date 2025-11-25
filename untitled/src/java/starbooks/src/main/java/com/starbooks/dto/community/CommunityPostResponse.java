package java.starbooks.src.main.java.com.starbooks.dto.community;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommunityPostResponse {

    private Long postId;
    private Long userId;
    private Long bookId;
    private String postType;

    private String title;
    private String content;

    private Boolean isPublished;

    private String createdAt;
    private String updatedAt;
}
