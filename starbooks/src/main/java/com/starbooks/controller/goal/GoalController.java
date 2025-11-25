package com.starbooks.controller.goal;

import com.starbooks.domain.user.User;
import com.starbooks.domain.goal.Goal;
import com.starbooks.dto.goal.*;
import com.starbooks.service.goal.GoalService;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService service;
    private final UserRepository userRepo;

    @PostMapping
    public ResponseEntity<GoalResponseDto> create(@RequestBody GoalRequestDto dto) {

        User user = userRepo.findById(dto.getUserId()).orElseThrow();

        Goal g = Goal.builder()
                .user(user)
                .goalType(dto.getGoalType())
                .targetBooks(dto.getTargetBooks())
                .targetPages(dto.getTargetPages())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();

        Goal saved = service.save(g);

        return ResponseEntity.ok(GoalResponseDto.builder()
                .goalId(saved.getGoalId())
                .userId(saved.getUser().getUserId())
                .goalType(saved.getGoalType())
                .targetBooks(saved.getTargetBooks())
                .targetPages(saved.getTargetPages())
                .achievedBooks(saved.getAchievedBooks())
                .startDate(saved.getStartDate())
                .endDate(saved.getEndDate())
                .lastUpdated(saved.getLastUpdated())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalResponseDto> get(@PathVariable Long id) {
        Goal g = service.find(id);

        return ResponseEntity.ok(GoalResponseDto.builder()
                .goalId(g.getGoalId())
                .userId(g.getUser().getUserId())
                .goalType(g.getGoalType())
                .targetBooks(g.getTargetBooks())
                .targetPages(g.getTargetPages())
                .achievedBooks(g.getAchievedBooks())
                .startDate(g.getStartDate())
                .endDate(g.getEndDate())
                .lastUpdated(g.getLastUpdated())
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
