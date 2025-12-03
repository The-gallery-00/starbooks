package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingCalendar;

import java.time.LocalDate;

public interface ReadingCalendarService {
    ReadingCalendar updateDailyProgress(Long userId, LocalDate date, Integer pagesRead);
}
