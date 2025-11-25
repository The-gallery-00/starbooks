package java.starbooks.src.main.java.com.starbooks.domain.challenge;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeParticipantRepository extends JpaRepository<ChallengeParticipant, Long> {

    // 특정 챌린지에 참여 중인 모든 사용자 조회
    List<ChallengeParticipant> findByChallengeId(Long challengeId);

    // 특정 유저가 특정 챌린지에 참여 중인지 조회
    Optional<ChallengeParticipant> findByChallengeIdAndUserId(Long challengeId, Long userId);

    // (선택) 유저 기준 참여 챌린지 조회
    List<ChallengeParticipant> findByUserId(Long userId);
}
