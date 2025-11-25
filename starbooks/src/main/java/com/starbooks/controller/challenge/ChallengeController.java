package com.starbooks.controller.challenge;

import com.starbooks.domain.challenge.*;
import com.starbooks.domain.user.User;
import com.starbooks.dto.challenge.*;
import com.starbooks.service.challenge.ChallengeService;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService service;
    private final UserRepository userRepo;

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

        Challenge saved = service.create(c);

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

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeResponseDto> get(@PathVariable Long id) {
        Challenge c = service.find(id);

        return ResponseEntity.ok(
                ChallengeResponseDto.builder()
                        .challengeId(c.getChallengeId())
                        .title(c.getTitle())
                        .creatorId(c.getCreator().getUserId())
                        .targetBooks(c.getTargetBooks())
                        .status(c.getStatus())
                        .build()
        );
    }
}
