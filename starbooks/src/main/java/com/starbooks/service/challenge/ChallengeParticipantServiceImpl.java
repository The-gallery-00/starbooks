package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.*;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.challenge.ChallengeParticipantRequest;
import com.starbooks.dto.challenge.ChallengeParticipantResponse;
import com.starbooks.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeParticipantServiceImpl implements ChallengeParticipantService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeParticipantRepository participantRepository;
    private final UserRepository userRepository;

    // -------------------------
    // 1. 챌린지 참여
    // -------------------------
    @Override
    public ChallengeParticipantResponse joinChallenge(Long userId, ChallengeParticipantRequest request) {

        Challenge challenge = challengeRepository.findById(request.getChallengeId())
                .orElseThrow(() -> new NotFoundException("Challenge not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        ChallengeParticipant participant = ChallengeParticipant.builder()
                .challenge(challenge)
                .user(user)
                .progress(0)
                .isCompleted(false)
                .build();

        ChallengeParticipant saved = participantRepository.save(participant);

        return toResponse(saved);
    }

    // -------------------------
    // 2. 챌린지 나가기
    // -------------------------
    @Override
    public void leaveChallenge(Long userId, Long challengeId) {

        ChallengeParticipant participant =
                participantRepository.findByChallengeIdAndUserId(challengeId, userId)
                        .orElseThrow(() -> new NotFoundException("Participation not found"));

        participantRepository.delete(participant);
    }

    // -------------------------
    // 3. 챌린지 참여자 리스트 조회
    // -------------------------
    @Override
    public List<ChallengeParticipantResponse> getParticipants(Long challengeId) {

        return participantRepository.findByChallengeId(challengeId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -------------------------
    // 4. 유저의 챌린지 진행도 업데이트
    // -------------------------
    @Override
    public void updateProgress(Long userId, Long challengeId, Integer progress) {

        ChallengeParticipant participant =
                participantRepository.findByChallengeIdAndUserId(challengeId, userId)
                        .orElseThrow(() -> new NotFoundException("Participant not found"));

        participant.setProgress(progress);

        if (progress >= participant.getChallenge().getTargetBooks())
            participant.setIsCompleted(true);

        participantRepository.save(participant);
    }

    private ChallengeParticipantResponse toResponse(ChallengeParticipant p) {

        return ChallengeParticipantResponse.builder()
                .participationId(p.getParticipationId())
                .challengeId(p.getChallenge().getChallengeId())
                .userId(p.getUser().getUserId())
                .progress(p.getProgress())
                .isCompleted(p.getIsCompleted())
                .joinedAt(p.getJoinedAt().toString())
                .build();
    }
}
