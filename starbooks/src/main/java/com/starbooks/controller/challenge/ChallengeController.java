package com.starbooks.controller.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeParticipant;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.domain.challenge.ChallengeParticipantRepository;
import com.starbooks.dto.challenge.*;
import com.starbooks.service.challenge.ChallengeService;
import com.starbooks.service.challenge.ChallengeParticipationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;
    private final ChallengeParticipationService participationService;
    private final ChallengeParticipantRepository participantRepository;
    private final UserRepository userRepo;

    // ⭐ 챌린지 생성
    @PostMapping
    public ResponseEntity<ChallengeResponseDto> create(@RequestBody ChallengeRequestDto dto) {

        User creator = userRepo.findById(dto.getCreatorId()).orElseThrow();

        Challenge c = Challenge.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .targetBooks(dto.getTargetBooks())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .creator(creator)
                .build();

        Challenge saved = challengeService.create(c);

        return ResponseEntity.ok(
                ChallengeResponseDto.builder()
                        .challengeId(saved.getChallengeId())
                        .title(saved.getTitle())
                        .description(saved.getDescription())
                        .targetBooks(saved.getTargetBooks())
                        .startDate(saved.getStartDate())
                        .endDate(saved.getEndDate())
                        .creatorId(saved.getCreator().getUserId())
                        .status(saved.getStatus())
                        .createdAt(saved.getCreatedAt())
                        .build()
        );
    }

    // ⭐ 단일 챌린지 조회
    @GetMapping("/{challengeId}")
    public ResponseEntity<ChallengeResponseDto> get(@PathVariable Long challengeId) {

        Challenge c = challengeService.find(challengeId);

        return ResponseEntity.ok(
                ChallengeResponseDto.builder()
                        .challengeId(c.getChallengeId())
                        .title(c.getTitle())
                        .description(c.getDescription())
                        .targetBooks(c.getTargetBooks())
                        .startDate(c.getStartDate())
                        .endDate(c.getEndDate())
                        .creatorId(c.getCreator().getUserId())
                        .status(c.getStatus())
                        .createdAt(c.getCreatedAt())
                        .build()
        );
    }

    // ⭐ 전체 챌린지 조회 (요약 + 참여자 수 포함)
    @GetMapping
    public ResponseEntity<List<ChallengeSummaryDto>> list() {

        List<Challenge> list = challengeService.findAll();

        List<ChallengeSummaryDto> dto = list.stream()
                .map(c -> ChallengeSummaryDto.builder()
                        .challengeId(c.getChallengeId())
                        .title(c.getTitle())
                        .status(c.getStatus())
                        .startDate(c.getStartDate())
                        .endDate(c.getEndDate())
                        .targetBooks(c.getTargetBooks())
                        .participantCount(participantRepository.countByChallenge(c))
                        .build()
                ).collect(Collectors.toList());

        return ResponseEntity.ok(dto);
    }

    // ⭐ 상세 조회 (참여자 수 포함)
    @GetMapping("/{challengeId}/detail")
    public ResponseEntity<ChallengeDetailDto> detail(@PathVariable Long challengeId) {

        Challenge c = challengeService.find(challengeId);
        long participants = participantRepository.countByChallenge(c);

        ChallengeDetailDto dto = ChallengeDetailDto.builder()
                .challengeId(c.getChallengeId())
                .title(c.getTitle())
                .description(c.getDescription())
                .targetBooks(c.getTargetBooks())
                .startDate(c.getStartDate())
                .endDate(c.getEndDate())
                .creatorId(c.getCreator() != null ? c.getCreator().getUserId() : null)
                .status(c.getStatus())
                .createdAt(c.getCreatedAt())
                .participantCount(participants)
                .build();

        return ResponseEntity.ok(dto);
    }

    // ⭐ 참여하기
    @PostMapping("/{challengeId}/join")
    public ResponseEntity<String> join(@PathVariable Long challengeId, @RequestParam Long userId) {
        participationService.join(challengeId, userId);
        return ResponseEntity.ok("참여 완료");
    }

    // ⭐ 참여 취소
    @DeleteMapping("/{challengeId}/join")
    public ResponseEntity<String> cancelJoin(@PathVariable Long challengeId, @RequestParam Long userId) {
        participationService.cancel(challengeId, userId);
        return ResponseEntity.ok("참여 취소 완료");
    }

    // ⭐ 내가 참여 중인 챌린지 조회
    @GetMapping("/my")
    public ResponseEntity<List<ChallengeSummaryDto>> getMyChallenges(@RequestParam Long userId) {

        List<Challenge> list = participationService.getMyChallenges(userId);

        List<ChallengeSummaryDto> dto = list.stream()
                .map(c -> ChallengeSummaryDto.builder()
                        .challengeId(c.getChallengeId())
                        .title(c.getTitle())
                        .status(c.getStatus())
                        .startDate(c.getStartDate())
                        .endDate(c.getEndDate())
                        .targetBooks(c.getTargetBooks())
                        .participantCount(participantRepository.countByChallenge(c))
                        .build()
                ).collect(Collectors.toList());

        return ResponseEntity.ok(dto);
    }
}
