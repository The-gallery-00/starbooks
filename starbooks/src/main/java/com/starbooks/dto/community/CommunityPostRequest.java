package com.starbooks.dto.community;

import lombok.Data;

@Data
public class CommunityPostRequest {
    private Long bookId;
    private String postType;
    private String title;
    private String content;
}
