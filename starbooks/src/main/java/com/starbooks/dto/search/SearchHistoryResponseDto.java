// src/main/java/com/starbooks/dto/search/SearchHistoryResponseDto.java
package com.starbooks.dto.search;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchHistoryResponseDto {

    private Long searchId;
    private Long userId;
    private String keyword;
    private LocalDateTime searchedAt;
}
