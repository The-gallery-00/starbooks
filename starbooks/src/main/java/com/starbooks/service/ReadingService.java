package com.starbooks.service;

import com.starbooks.entity.ReadingRecord;
import com.starbooks.repository.ReadingRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReadingService {

    private final ReadingRecordRepository readingRecordRepository;

    public ReadingRecord save(ReadingRecord record) {
        return readingRecordRepository.save(record);
    }

    public Optional<ReadingRecord> findById(Long id) {
        return readingRecordRepository.findById(id);
    }
}
