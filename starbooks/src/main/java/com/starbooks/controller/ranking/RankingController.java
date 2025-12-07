package com.starbooks.controller.ranking;

import com.starbooks.domain.ranking.Ranking;
import com.starbooks.dto.ranking.RankingResponseDto;
import com.starbooks.domain.ranking.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rankings")
@RequiredArgsConstructor
public class RankingController {

    private final RankingRepository repo;


    @GetMapping
    public ResponseEntity<List<RankingResponseDto>> getList() {
        // rankPosition 기준 오름차순 정렬 (1위, 2위, 3위 순서)
        List<Ranking> list = repo.findAll(Sort.by(Sort.Direction.ASC, "rankPosition"));

        List<RankingResponseDto> dtos = list.stream()
                .map(r -> RankingResponseDto.builder()
                        .rankingId(r.getRankingId())
                        .userId(r.getUser().getUserId())
                        // User 엔티티에 getName()이 있는지 확인하세요 (없으면 getNickname() 등 사용)
                        .nickname(r.getUser() != null ? r.getUser().getNickname() : "알 수 없음")
                        .rankingType(r.getRankingType())
                        .rankPosition(r.getRankPosition())
                        .value(r.getValue())
                        .calculatedAt(r.getCalculatedAt())
                        .build()
                ).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RankingResponseDto> get(@PathVariable Long id) {

        Ranking r = repo.findById(id).orElseThrow();

        return ResponseEntity.ok(
                RankingResponseDto.builder()
                        .rankingId(r.getRankingId())
                        .userId(r.getUser().getUserId())
                        .nickname(r.getUser() != null ? r.getUser().getNickname() : "알 수 없음")
                        .rankingType(r.getRankingType())
                        .rankPosition(r.getRankPosition())
                        .value(r.getValue())
                        .calculatedAt(r.getCalculatedAt())
                        .build()
        );
    }
}
