package com.starbooks.controller.user;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.dto.challenge.ChallengeSummaryDto;
import com.starbooks.service.challenge.ChallengeParticipationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final ChallengeParticipationService participationService;

    // ✅ 6) 내가 참여 중인 챌린지 조회
    // 요청: GET /api/users/{userId}/challenges
    @GetMapping("/{userId}/challenges")
    public ResponseEntity<List<ChallengeSummaryDto>> getUserChallenges(@PathVariable Long userId) {

        // 1. 서비스에서 내가 참여한 챌린지 엔티티 목록 가져오기
        List<Challenge> challenges = participationService.getMyChallenges(userId);

        // 2. DTO로 변환 (Challenge -> ChallengeSummaryDto)
        List<ChallengeSummaryDto> response = challenges.stream()
                .map(c -> ChallengeSummaryDto.builder()
                        .challengeId(c.getChallengeId())
                        .title(c.getTitle())
                        .status(c.getStatus()) // 요청하신 응답 필드 (status, title, id) 포함됨
                        // 아래는 선택사항이지만 프론트엔드 재사용을 위해 다 채워주는 것이 좋습니다.
                        .startDate(c.getStartDate())
                        .endDate(c.getEndDate())
                        .targetBooks(c.getTargetBooks())
                        .participantCount((long) 0) // 참여자 수는 필요하면 repo에서 조회, 여기선 0 또는 생략
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}