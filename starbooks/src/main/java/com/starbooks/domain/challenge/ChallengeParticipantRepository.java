// com/starbooks/domain/challenge/ChallengeParticipantRepository.java
package com.starbooks.domain.challenge;

import com.starbooks.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeParticipantRepository extends JpaRepository<ChallengeParticipant, Long> {

    boolean existsByChallengeAndUser(Challenge challenge, User user);

    Optional<ChallengeParticipant> findByChallengeAndUser(Challenge challenge, User user);

    List<ChallengeParticipant> findByUser(User user);

    long countByChallenge(Challenge challenge);
}