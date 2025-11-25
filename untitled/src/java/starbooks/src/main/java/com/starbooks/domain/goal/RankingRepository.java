package java.starbooks.src.main.java.com.starbooks.domain.goal;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RankingRepository extends JpaRepository<Ranking, Long> {

    // 특정 사용자 랭킹 조회
    List<Ranking> findByUserUserId(Long userId);

    // 특정 랭킹 타입 조회 (예: BOOK_COUNT)
    List<Ranking> findByRankingType(RankingType rankingType);

    // 가장 최근 랭킹 계산 순서대로 가져오기
    List<Ranking> findAllByOrderByCalculatedAtDesc();

    // 특정 타입에서 순위 기준으로 정렬
    List<Ranking> findByRankingTypeOrderByRankPositionAsc(RankingType rankingType);

}
