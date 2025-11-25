// com.starbooks.service.reading.ReadingRecordServiceImpl.java
package com.starbooks.service.reading;

import com.starbooks.domain.reading.ReadingRecord;
import com.starbooks.domain.reading.ReadingRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReadingRecordServiceImpl implements ReadingRecordService {

    private final ReadingRecordRepository repo;

    @Override
    public ReadingRecord save(ReadingRecord r) {
        return repo.save(r);
    }

    @Override
    public ReadingRecord find(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
