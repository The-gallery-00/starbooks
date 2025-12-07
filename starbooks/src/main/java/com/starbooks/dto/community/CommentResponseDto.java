// src/main/java/com/starbooks/dto/community/CommentResponseDto.java
package com.starbooks.dto.community;

import lombok.*;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto {

    private Long commentId;
    private Long postId;
    private Long userId;
    private String username;
    private String content;
    private ZonedDateTime createdAt;
    private LocalDateTime updatedAt;
}
