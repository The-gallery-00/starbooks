package com.starbooks.service;

import com.starbooks.entity.Ranking;
import com.starbooks.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final RankingRepository rankingRepository;

    public List<Ranking> findAll() {
        return rankingRepository.findAll();
    }
}
