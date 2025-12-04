package com.starbooks.dto.reading;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReadingProgressResponseDto {
    private int targetPages;     // 목표 페이지
    private int achievedPages;   // 오늘 읽은 누적 페이지
}
