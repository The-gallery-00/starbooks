// com/starbooks/service/challenge/ChallengeParticipationService.java
package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeParticipant;

import java.util.List;

public interface ChallengeParticipationService {
    ChallengeParticipant join(Long challengeId, Long userId);
    void cancel(Long challengeId, Long userId);
    List<Challenge> getMyChallenges(Long userId);
}
