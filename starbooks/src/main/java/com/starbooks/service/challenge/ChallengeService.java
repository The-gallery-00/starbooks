package com.starbooks.service.challenge;

import com.starbooks.dto.challenge.ChallengeRequest;
import com.starbooks.dto.challenge.ChallengeResponse;

import java.util.List;

public interface ChallengeService {

    ChallengeResponse createChallenge(ChallengeRequest request);

    ChallengeResponse getChallenge(Long challengeId);

    List<ChallengeResponse> getAllChallenges();

    List<ChallengeResponse> getActiveChallenges();

    void updateChallengeStatus(Long challengeId, String status);  // SCHEDULED, ACTIVE, COMPLETED, CANCELLED
}
