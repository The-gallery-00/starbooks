package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingCalendar;

import java.time.LocalDate;
import java.util.Optional;

public interface ReadingCalendarService {
    ReadingCalendar updateDailyProgress(Long userId, LocalDate date, Integer pagesRead);

    // 특정 유저의 특정 날짜 기록 조회 (오늘 읽은 페이지 조회할 때 사용)
    Optional<ReadingCalendar> findByUserAndDate(Long userId, LocalDate date);
}
