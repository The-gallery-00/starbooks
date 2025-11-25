import java.time.LocalDate;
import java.util.List;

public interface ReadingCalendarService {
    void recordReading(Long userId, LocalDate date);
    List<LocalDate> getReadingDates(Long userId, int year, int month);
}

