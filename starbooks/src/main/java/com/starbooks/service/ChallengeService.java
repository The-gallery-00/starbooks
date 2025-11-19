package com.starbooks.service;

import com.starbooks.entity.Challenge;
import com.starbooks.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;

    public Challenge save(Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    public Optional<Challenge> findById(Long id) {
        return challengeRepository.findById(id);
    }
}
