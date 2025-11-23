package com.starbooks.domain.search.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class SearchHistoryResponseDto {
    private Long searchId;
    private Long userId;
    private String keyword;
    private LocalDateTime searchedAt;
}
