package com.starbooks.repository;

import com.starbooks.entity.ReadingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingRecordRepository extends JpaRepository<ReadingRecord, Long> {
}
