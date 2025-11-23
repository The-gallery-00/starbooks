package com.starbooks.domain.reading;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReadingRecordRepository extends JpaRepository<ReadingRecord, Long> {

    Optional<ReadingRecord> findByUserIdAndBookId(Long userId, Long bookId);

    List<ReadingRecord> findByUserId(Long userId);
}
