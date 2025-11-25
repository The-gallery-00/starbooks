// src/main/java/com/starbooks/dto/community/CommunityPostRequestDto.java
package com.starbooks.dto.community;

import com.starbooks.domain.community.PostType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityPostRequestDto {

    private Long userId;
    private Long bookId;       // optional
    private PostType postType;
    private String title;
    private String content;
}
