package java.starbooks.src.main.java.com.starbooks.dto.readingCalendar;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
@Builder
public class ReadingCalendarResponse {
    private Long calendarId;
    private Long userId;
    private LocalDate date;
    private Integer pagesRead;
    private Boolean goalAchieved;
}
