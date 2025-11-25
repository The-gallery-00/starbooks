// com.starbooks.service.challenge.ChallengeService.java
package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;

public interface ChallengeService {
    Challenge create(Challenge challenge);
    Challenge find(Long id);
}
