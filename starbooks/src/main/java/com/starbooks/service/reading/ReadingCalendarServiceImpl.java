// src/main/java/com/starbooks/service/reading/ReadingCalendarServiceImpl.java
package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingCalendar;
import com.starbooks.domain.reading.ReadingCalendarRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReadingCalendarServiceImpl implements ReadingCalendarService {

    private final ReadingCalendarRepository calendarRepo;
    private final UserRepository userRepository;

    @Override
    public ReadingCalendar updateDailyProgress(Long userId,
                                               LocalDate date,
                                               Integer pagesRead) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 해당 날짜의 기존 기록이 있으면 가져오고, 없으면 새로 생성
        ReadingCalendar calendar = calendarRepo.findByUserAndReadingDate(user, date)
                .orElse(
                        ReadingCalendar.builder()
                                .user(user)
                                .readingDate(date)
                                .build()
                );

        // 오늘 읽은 페이지 수 저장 (누적이 아니라 "오늘 총 읽은 페이지"로 사용)
        calendar.setPagesRead(pagesRead);

        // 유저의 일일 목표와 비교해서 달성 여부 설정
        Integer dailyGoal = user.getDailyPageGoal();
        if (dailyGoal != null && pagesRead != null) {
            calendar.setGoalAchieved(pagesRead >= dailyGoal);
        } else {
            calendar.setGoalAchieved(false);
        }

        return calendarRepo.save(calendar);
    }

    // ⭐ 오늘/특정 날짜에 읽은 페이지 조회할 때 사용
    @Override
    public Optional<ReadingCalendar> findByUserAndDate(Long userId, LocalDate date) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return calendarRepo.findByUserAndReadingDate(user, date);
    }
    @Override
    public int getTodayPages(Long userId) {
        return findByUserAndDate(userId, LocalDate.now())
                .map(c -> c.getPagesRead() == null ? 0 : c.getPagesRead())
                .orElse(0);
    }

}
