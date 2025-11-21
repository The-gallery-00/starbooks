package com.starbooks.domain.goal;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    // 특정 유저의 목표 전체 조회
    List<Goal> findByUserUserId(Long userId);

    // goalType으로 조회 (예: DAILY)
    List<Goal> findByGoalType(GoalType goalType);

    // 날짜 범위로 조회 (해당 기간 중 목표 존재하는 경우)
    List<Goal> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(
            java.time.LocalDate startDate,
            java.time.LocalDate endDate
    );
}
