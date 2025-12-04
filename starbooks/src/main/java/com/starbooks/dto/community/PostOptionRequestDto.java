package com.starbooks.dto.community;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostOptionRequestDto {
    private String optionText;
    private Boolean isCorrect; // QUIZ일 때만 true 가능
    private Integer optionOrder;
}
