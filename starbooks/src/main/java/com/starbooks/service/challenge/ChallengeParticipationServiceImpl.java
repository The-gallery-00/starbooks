// com/starbooks/service/challenge/ChallengeParticipationServiceImpl.java
package com.starbooks.service.challenge;

import com.starbooks.domain.challenge.Challenge;
import com.starbooks.domain.challenge.ChallengeParticipant;
import com.starbooks.domain.challenge.ChallengeParticipantRepository;
import com.starbooks.domain.challenge.ChallengeRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeParticipationServiceImpl implements ChallengeParticipationService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeParticipantRepository participantRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ChallengeParticipant join(Long challengeId, Long userId) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        // 이미 참여 중인지 검사
        if (participantRepository.existsByChallengeAndUser(challenge, user)) {
            throw new IllegalStateException("이미 참여중인 챌린지입니다.");
        }

        ChallengeParticipant p = ChallengeParticipant.builder()
                .challenge(challenge)
                .user(user)
                .joinedAt(LocalDateTime.now())
                .build();

        return participantRepository.save(p);
    }

    @Override
    @Transactional
    public void cancel(Long challengeId, Long userId) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        ChallengeParticipant p = participantRepository.findByChallengeAndUser(challenge, user)
                .orElseThrow(() -> new IllegalStateException("참여 중인 챌린지가 아닙니다."));

        participantRepository.delete(p);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Challenge> getMyChallenges(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return participantRepository.findByUser(user)
                .stream()
                .map(ChallengeParticipant::getChallenge)
                .collect(Collectors.toList());
    }
}
