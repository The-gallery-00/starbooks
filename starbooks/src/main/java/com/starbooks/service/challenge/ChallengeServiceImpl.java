package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeRepository;
import com.starbooks.domain.challenge.ChallengeStatus;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.challenge.ChallengeRequest;
import com.starbooks.dto.challenge.ChallengeResponse;
import com.starbooks.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    // ---------------------------
    // 1. 챌린지 생성
    // ---------------------------
    @Override
    public ChallengeResponse createChallenge(ChallengeRequest request) {

        User creator = userRepository.findById(request.getCreatorId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Challenge challenge = Challenge.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .targetBooks(request.getTargetBooks())
                .startDate(Date.valueOf(request.getStartDate()))
                .endDate(Date.valueOf(request.getEndDate()))
                .creator(creator)
                .status(ChallengeStatus.SCHEDULED)
                .build();

        Challenge saved = challengeRepository.save(challenge);

        return toResponse(saved);
    }

    // ---------------------------
    // 2. 챌린지 상세 조회
    // ---------------------------
    @Override
    public ChallengeResponse getChallenge(Long challengeId) {

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NotFoundException("Challenge not found"));

        return toResponse(challenge);
    }

    // ---------------------------
    // 3. 전체 챌린지 조회
    // ---------------------------
    @Override
    public List<ChallengeResponse> getAllChallenges() {

        return challengeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ---------------------------
    // 4. 활성 챌린지(기간 내) 조회
    // ---------------------------
    @Override
    public List<ChallengeResponse> getActiveChallenges() {

        return challengeRepository.findByStatus(ChallengeStatus.ACTIVE)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ---------------------------
    // 5. 챌린지 상태 변경
    // ---------------------------
    @Override
    public void updateChallengeStatus(Long challengeId, String status) {

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NotFoundException("Challenge not found"));

        challenge.setStatus(ChallengeStatus.valueOf(status));
        challengeRepository.save(challenge);
    }

    // ---------------------------
    // Entity → DTO 변환
    // ---------------------------
    private ChallengeResponse toResponse(Challenge c) {

        return ChallengeResponse.builder()
                .challengeId(c.getChallengeId())
                .title(c.getTitle())
                .description(c.getDescription())
                .targetBooks(c.getTargetBooks())
                .startDate(c.getStartDate().toString())
                .endDate(c.getEndDate().toString())
                .creatorId(c.getCreator().getUserId())
                .status(c.getStatus().name())
                .createdAt(c.getCreatedAt().toString())
                .build();
    }
}
