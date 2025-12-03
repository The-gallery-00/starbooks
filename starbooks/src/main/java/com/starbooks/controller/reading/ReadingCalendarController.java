package com.starbooks.controller.reading;

import com.starbooks.domain.reading.ReadingCalendar;
import com.starbooks.domain.reading.ReadingCalendarRepository;
import com.starbooks.dto.reading.ReadingCalendarDayDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class ReadingCalendarController {

    private final ReadingCalendarRepository calendarRepo;

    // 예: /api/calendar/3?year=2025&month=11
    @GetMapping("/{userId}")
    public ResponseEntity<List<ReadingCalendarDayDto>> getMonthlyCalendar(
            @PathVariable Long userId,
            @RequestParam int year,
            @RequestParam int month
    ) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<ReadingCalendar> list =
                calendarRepo.findByUser_UserIdAndReadingDateBetween(userId, start, end);

        List<ReadingCalendarDayDto> result = list.stream()
                .map(c -> ReadingCalendarDayDto.builder()
                        .date(c.getReadingDate())
                        .goalAchieved(c.getGoalAchieved())
                        .pagesRead(c.getPagesRead())
                        .build()
                ).toList();

        return ResponseEntity.ok(result);
    }
}
