package com.starbooks.dto.community;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizPollRequestDto {
    private CommunityPostRequestDto post;
    private List<PostOptionRequestDto> options;
}
