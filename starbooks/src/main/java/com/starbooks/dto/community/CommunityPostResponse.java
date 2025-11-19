package com.starbooks.dto.community;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommunityPostResponse {
    private Long postId;
    private String authorId;
    private String title;
    private String content;
}
