// com.starbooks.service.challenge.ChallengeService.java
package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;

import java.util.List;

public interface ChallengeService {
    Challenge create(Challenge challenge);
    Challenge find(Long id);
    List<Challenge> findAll(); // 목록 조회 추가
}
