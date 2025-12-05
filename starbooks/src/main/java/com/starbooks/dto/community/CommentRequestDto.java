// src/main/java/com/starbooks/dto/community/CommentRequestDto.java
package com.starbooks.dto.community;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequestDto {

    private Long postId;
    private String username;
    private String content;
}
