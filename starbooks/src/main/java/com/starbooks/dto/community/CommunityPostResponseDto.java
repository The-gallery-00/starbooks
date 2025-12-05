// src/main/java/com/starbooks/dto/community/CommunityPostResponseDto.java
package com.starbooks.dto.community;

import com.starbooks.domain.community.CommunityPost;
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
    private String username;
    private String bookTitle; // 수정됨!
    private PostType postType;
    private String title;
    private String content; // QUIZ/POLL은 문제 내용
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /** ⭐Entity → DTO 변환 메서드 */
    public static CommunityPostResponseDto from(CommunityPost post) {
        return CommunityPostResponseDto.builder()
                .postId(post.getPostId())
                .userId(post.getUser().getUserId())
                .bookTitle(post.getBookTitle()) // 수정됨!
                .postType(post.getPostType())
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
