package java.starbooks.src.main.java.com.starbooks.dto.community;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentRequest {
    private Long postId;
    private String content;
}
