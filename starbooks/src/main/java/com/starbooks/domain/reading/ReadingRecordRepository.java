package com.starbooks.domain.reading;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReadingRecordRepository extends JpaRepository<ReadingRecord, Long> {

    // 특정 유저의 독서 기록 전체 조회
    List<ReadingRecord> findByUserUserId(Long userId);

    // 특정 유저 + 특정 책의 독서 기록 조회 (1:1 관계)
    ReadingRecord findByUserUserIdAndBookBookId(Long userId, Long bookId);

    // 특정 책에 대한 모든 독서 기록 조회
    List<ReadingRecord> findByBookBookId(Long bookId);

    // 특정 유저의 상태(READING, FINISHED ...) 기준 조회
    List<ReadingRecord> findByUserUserIdAndReadingStatus(Long userId, ReadingStatus status);

    // 특정 유저의 시작 날짜 ~ 종료 날짜 범위 조회
    List<ReadingRecord> findByUserUserIdAndStartDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // 특정 책을 완료한 사람만 조회 (FINISHED)
    List<ReadingRecord> findByBookBookIdAndReadingStatus(Long bookId, ReadingStatus status);

    // 특정 유저 + 특정 책 존재 여부 체크 (중복 등록 방지)
    boolean existsByUserUserIdAndBookBookId(Long userId, Long bookId);
}
