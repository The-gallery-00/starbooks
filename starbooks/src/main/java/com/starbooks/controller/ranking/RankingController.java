package com.starbooks.controller.ranking;

import com.starbooks.domain.ranking.Ranking;
import com.starbooks.dto.ranking.RankingResponseDto;
import com.starbooks.domain.ranking.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rankings")
@RequiredArgsConstructor
public class RankingController {

    private final RankingRepository repo;

    @GetMapping("/{id}")
    public ResponseEntity<RankingResponseDto> get(@PathVariable Long id) {

        Ranking r = repo.findById(id).orElseThrow();

        return ResponseEntity.ok(
                RankingResponseDto.builder()
                        .rankingId(r.getRankingId())
                        .userId(r.getUser().getUserId())
                        .rankingType(r.getRankingType())
                        .rankPosition(r.getRankPosition())
                        .value(r.getValue())
                        .calculatedAt(r.getCalculatedAt())
                        .build()
        );
    }
}
