// com.starbooks.service.challenge.ChallengeServiceImpl.java
package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository repository;

    @Override
    public Challenge create(Challenge c) {
        return repository.save(c);
    }

    @Override
    public Challenge find(Long id) {
        return repository.findById(id).orElseThrow();
    }
}
