package com.starbooks.domain.reading;

import com.starbooks.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReadingCalendarRepository extends JpaRepository<ReadingCalendar, Long> {
    // 특정 날짜 기록이 있는지 확인
    Optional<ReadingCalendar> findByUserAndReadingDate(User user, LocalDate readingDate);

    // 특정 유저의 전체 캘린더 조회 (월별 조회에도 사용 가능)
    List<ReadingCalendar> findByUser_UserId(Long userId);

    // ⭐ 특정 유저의 한 달치 (날짜 범위) 조회
    List<ReadingCalendar> findByUser_UserIdAndReadingDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
}
