package java.starbooks.src.main.java.com.starbooks.service.reading;

import com.starbooks.dto.reading.ReadingRecordRequest;
import com.starbooks.dto.reading.ReadingRecordResponse;

import java.util.List;

public interface ReadingRecordService {

    ReadingRecordResponse createOrUpdateRecord(Long userId, ReadingRecordRequest request);

    ReadingRecordResponse getRecord(Long userId, Long bookId);

    List<ReadingRecordResponse> getUserRecords(Long userId);

    void deleteRecord(Long userId, Long bookId);
}
