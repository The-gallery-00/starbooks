package com.starbooks.domain.challenge;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    // 상태별 검색 (ACTIVE, SCHEDULED 등)
    List<Challenge> findByStatus(ChallengeStatus status);

}

