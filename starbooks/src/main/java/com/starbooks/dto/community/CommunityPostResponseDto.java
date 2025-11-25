// src/main/java/com/starbooks/dto/community/CommunityPostResponseDto.java
package com.starbooks.dto.community;

import com.starbooks.domain.community.PostType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityPostResponseDto {

    private Long postId;
    private Long userId;
    private Long bookId;
    private PostType postType;
    private String title;
    private String content;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
