package com.starbooks.domain.goal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReadingCalendarRepository extends JpaRepository<ReadingCalendar, Long> {

    // 특정 유저의 모든 캘린더 기록 조회
    List<ReadingCalendar> findByUserUserId(Long userId);

    // 특정 유저 + 특정 날짜 기록 조회
    ReadingCalendar findByUserUserIdAndReadingDate(Long userId, LocalDate readingDate);

    // 특정 유저의 날짜 범위 기록 조회
    List<ReadingCalendar> findByUserUserIdAndReadingDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // 특정 날짜 기준 모든 사용자 기록 조회
    List<ReadingCalendar> findByReadingDate(LocalDate date);

    // 목표 달성 여부로 조회
    List<ReadingCalendar> findByUserUserIdAndGoalAchieved(Long userId, Boolean goalAchieved);

}