import java.time.LocalDate;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.starbooks.domain.calendar.ReadingCalendar;
import com.starbooks.repository.calendar.ReadingCalendarRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class ReadingCalendarServiceImpl implements ReadingCalendarService {

    private final ReadingCalendarRepository calendarRepository;

    @Override
    public void recordReading(Long userId, LocalDate date) {
        boolean exists = calendarRepository.existsByUserIdAndDate(userId, date);
        if (!exists) {
            calendarRepository.save(new ReadingCalendar(userId, date));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<LocalDate> getReadingDates(Long userId, int year, int month) {
        return calendarRepository.findDatesByUserIdAndMonth(userId, year, month);
    }
}
