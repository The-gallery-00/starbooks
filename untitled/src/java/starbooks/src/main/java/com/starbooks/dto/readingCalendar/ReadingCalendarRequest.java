package java.starbooks.src.main.java.com.starbooks.dto.readingCalendar;

import lombok.Getter;
import java.time.LocalDate;

@Getter
public class ReadingCalendarRequest {
    private LocalDate date;
    private Integer pagesRead;
}
