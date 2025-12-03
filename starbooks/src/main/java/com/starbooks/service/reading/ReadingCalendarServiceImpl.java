package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingCalendar;
import com.starbooks.domain.reading.ReadingCalendarRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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

        ReadingCalendar calendar = calendarRepo.findByUserAndReadingDate(user, date)
                .orElse(
                        ReadingCalendar.builder()
                                .user(user)
                                .readingDate(date)
                                .build()
                );

        calendar.setPagesRead(pagesRead);

        Integer dailyGoal = user.getDailyPageGoal();

        if (dailyGoal != null && pagesRead != null) {
            calendar.setGoalAchieved(pagesRead >= dailyGoal);
        } else {
            calendar.setGoalAchieved(false);
        }

        return calendarRepo.save(calendar);
    }
}
