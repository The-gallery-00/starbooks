// com.starbooks.service.reading.ReadingRecordService.java
package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingRecord;

import java.util.List;

public interface ReadingRecordService {
    ReadingRecord save(ReadingRecord r);
    ReadingRecord find(Long recordId);
    void delete(Long recordId);
    List<ReadingRecord> findByUserId(Long userId);

}
