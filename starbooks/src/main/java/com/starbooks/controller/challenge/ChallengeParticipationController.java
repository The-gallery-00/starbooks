// com/starbooks/controller/challenge/ChallengeParticipationController.java
package com.starbooks.controller.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeParticipant;
import com.starbooks.dto.challenge.ChallengeDetailDto;
import com.starbooks.dto.challenge.ChallengeSummaryDto;
import com.starbooks.service.challenge.ChallengeParticipationService;
import com.starbooks.service.challenge.ChallengeService;
import com.starbooks.domain.challenge.ChallengeParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeParticipationController {

    private final ChallengeParticipationService participationService;
    private final ChallengeService challengeService;
    private final ChallengeParticipantRepository participantRepository;

    // 전체 챌린지 목록
    @GetMapping
    public ResponseEntity<List<ChallengeSummaryDto>> list() {
        List<Challenge> list = challengeService.findAll();

        List<ChallengeSummaryDto> dto = list.stream().map(c ->
                ChallengeSummaryDto.builder()
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

    // 챌린지 상세 조회 (확장된 필드)
    @GetMapping("/{id}/detail")
    public ResponseEntity<ChallengeDetailDto> detail(@PathVariable Long id) {
        Challenge c = challengeService.find(id);

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

    // 참여하기
    @PostMapping("/{id}/join")
    public ResponseEntity<String> join(@PathVariable Long id, @RequestParam Long userId) {
        ChallengeParticipant p = participationService.join(id, userId);
        return ResponseEntity.ok("참여 완료");
    }

    // 참여 취소
    @DeleteMapping("/{id}/join")
    public ResponseEntity<String> cancel(@PathVariable Long id, @RequestParam Long userId) {
        participationService.cancel(id, userId);
        return ResponseEntity.ok("참여 취소 완료");
    }

    // 내가 참여중인 챌린지 조회
    @GetMapping("/joined")
    public ResponseEntity<List<ChallengeSummaryDto>> myChallenges(@RequestParam Long userId) {
        List<Challenge> list = participationService.getMyChallenges(userId);

        List<ChallengeSummaryDto> dto = list.stream().map(c ->
                ChallengeSummaryDto.builder()
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
