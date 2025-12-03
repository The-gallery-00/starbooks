package com.starbooks.domain.reading;

import com.starbooks.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReadingRecordRepository extends JpaRepository<ReadingRecord, Long> {

    List<ReadingRecord> findByUser(User user);
    // 또는 userId로 바로 보고 싶으면
    List<ReadingRecord> findByUser_UserId(Long userId);
}

