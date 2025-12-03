// com.starbooks.service.challenge.ChallengeServiceImpl.java
package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeRepository;
import com.starbooks.event.challenge.ChallengeCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository repository;
    private final ApplicationEventPublisher eventPublisher; // ⭐ 추가

    @Override
    public Challenge create(Challenge c) {
        Challenge saved = repository.save(c);

        // ⭐ 챌린지 생성 이벤트 발행 (알림 트리거)
        eventPublisher.publishEvent(
                new ChallengeCreatedEvent(saved.getChallengeId(), saved.getCreator().getId())
        );

        return saved;
    }

    @Override
    public Challenge find(Long id) {
        return repository.findById(id).orElseThrow();
    }
}
