package com.starbooks.dto.community;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponse {

    private Long commentId;
    private Long postId;
    private Long userId;

    private String content;
    private String createdAt;
    private String updatedAt;
}
