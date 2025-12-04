// com/starbooks/service/challenge/ChallengeServiceImpl.java
package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeRepository;
import com.starbooks.event.challenge.ChallengeCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository repository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public Challenge create(Challenge c) {
        Challenge saved = repository.save(c);

        // ChallengeCreatedEvent: creator의 PK getter는 project User 엔티티에 맞춰 조정
        Long creatorId = saved.getCreator() != null ? saved.getCreator().getUserId() : null;

        eventPublisher.publishEvent(
                new ChallengeCreatedEvent(saved.getChallengeId(), creatorId)
        );

        return saved;
    }

    @Override
    public Challenge find(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public List<Challenge> findAll() {
        return repository.findAll();
    }

    @Override
    public void joinChallenge(Long id, Long userId) {

    }

    @Override
    public void cancelJoin(Long id, Long userId) {

    }

    @Override
    public List<Challenge> getChallengesByUser(Long userId) {
        return List.of();
    }

}