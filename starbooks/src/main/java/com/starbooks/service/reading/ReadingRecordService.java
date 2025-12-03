// com.starbooks.service.reading.ReadingRecordService.java
package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingRecord;

import java.util.List;

public interface ReadingRecordService {
    ReadingRecord save(ReadingRecord r);
    ReadingRecord find(Long id);
    void delete(Long id);
    List<ReadingRecord> findByUserId(Long userId);

}
