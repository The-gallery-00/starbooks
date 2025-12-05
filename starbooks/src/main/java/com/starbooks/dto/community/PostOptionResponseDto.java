package com.starbooks.dto.community;

import com.starbooks.domain.community.PostOption;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostOptionResponseDto {

    private Long optionId;
    private String optionText;
    private Boolean isCorrect;
    private Integer optionOrder;
    private Integer count;

    public static PostOptionResponseDto from(PostOption option) {
        return PostOptionResponseDto.builder()
                .optionId(option.getOptionId())
                .optionText(option.getOptionText())
                .isCorrect(option.getIsCorrect())
                .optionOrder(option.getOptionOrder())
                .build();
    }
}
