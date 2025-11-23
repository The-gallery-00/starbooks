package com.starbooks.service.challenge;

import com.starbooks.dto.challenge.ChallengeParticipantRequest;
import com.starbooks.dto.challenge.ChallengeParticipantResponse;

import java.util.List;

public interface ChallengeParticipantService {

    ChallengeParticipantResponse joinChallenge(Long userId, ChallengeParticipantRequest request);

    void leaveChallenge(Long userId, Long challengeId);

    List<ChallengeParticipantResponse> getParticipants(Long challengeId);

    void updateProgress(Long userId, Long challengeId, Integer progress);
}
