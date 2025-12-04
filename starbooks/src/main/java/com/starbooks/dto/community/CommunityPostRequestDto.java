package com.starbooks.dto.community;

import com.starbooks.domain.community.PostType;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityPostRequestDto {
    private Long userId;
    private String bookTitle; // 문자열 기반 저장

    private PostType postType;
    private String title;
    private String content; // 질문 또는 토론글 본문
}
