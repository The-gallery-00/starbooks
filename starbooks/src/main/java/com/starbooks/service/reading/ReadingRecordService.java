// com.starbooks.service.reading.ReadingRecordService.java
package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingRecord;

public interface ReadingRecordService {
    ReadingRecord save(ReadingRecord r);
    ReadingRecord find(Long id);
    void delete(Long id);
}
