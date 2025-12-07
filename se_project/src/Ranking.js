import React, { useState, useEffect, useContext } from 'react';
import './Ranking.css';
import { UserContext } from './UserContext'; 
import api from './api/axiosInstance'; // API 호출을 위해 추가

// 랭킹 아이콘 반환 헬퍼 함수
const getRankIcon = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '⭐';
};

const RankingItem = ({ rank, user, score, unit }) => {
  const isTopThree = rank <= 3;
  const profileIcon = getRankIcon(rank);
  
  return (
    <div className="ranking-row">
      <div className={`rank-num ${isTopThree ? 'top-tier' : ''}`}>
        {rank}
      </div>
      
      <div className="rank-profile">
        {/* 1~3위는 메달, 나머지는 별 아이콘 */}
        <span className="medal-icon">{profileIcon}</span>
        <span className="user-name">{user}</span>
      </div>
      
      <div className="rank-score">
        {score}<span className="score-unit">{unit}</span>
      </div>
    </div>
  );
};

export default function Ranking() {
  const { user } = useContext(UserContext);
  
  // 상태 관리
  const [readingRankings, setReadingRankings] = useState([]);
  const [challengeRankings, setChallengeRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 1. API 호출 및 데이터 분류
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await api.get('/api/rankings');
        // 백엔드 응답 구조에 따라 조정 (data.data 또는 data)
        const allRankings = response.data.data || response.data || [];

        // 타입별로 분류 (백엔드 Enum: READING, CHALLENGE 라고 가정)
        // 만약 백엔드 Enum이 'MONTHLY'라면 아래 필터 조건을 'MONTHLY'로 바꾸세요.
        const reading = allRankings.filter(r => r.rankingType === 'READING' || r.rankingType === 'MONTHLY');
        const challenge = allRankings.filter(r => r.rankingType === 'CHALLENGE');

        setReadingRankings(reading);
        setChallengeRankings(challenge);
      } catch (error) {
        console.error("랭킹 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  // ✅ 2. 내 순위 찾기 로직 (ID 기반 비교)
  const findMyEntry = (list) => {
    if (!user) return null;
    const currentUserId = user.userId || user.id || user.memberId;
    return list.find(item => item.userId === currentUserId);
  };

  const myReadingRank = findMyEntry(readingRankings);

  // 로딩 중일 때 간단한 표시 (기존 CSS 컨테이너 안에서)
  if (loading) {
     return (
        <div className="ranking-page-container" style={{textAlign:'center', padding:'100px 0'}}>
            <p>랭킹 정보를 불러오는 중입니다...</p>
        </div>
     );
  }

  return (
    <div className="ranking-page-container">
      
      <div className="ranking-columns">
        
        {/* --- 왼쪽: 월간 다독 순위 --- */}
        <div className="ranking-column">
          <div className="ranking-header-section">
            <h2 className="ranking-title">월간 다독 순위</h2>
            <p className="ranking-desc">이달의 독서왕은 누구일까요?</p>
          </div>

          <div className="ranking-list-wrapper">
            {readingRankings.length === 0 ? (
                <div style={{padding:'20px', textAlign:'center', color:'#999'}}>
                    아직 랭킹 데이터가 없습니다.
                </div>
            ) : (
                readingRankings.map(item => (
                  <RankingItem 
                    key={`reading-${item.rankingId}`} 
                    rank={item.rankPosition} 
                    user={item.nickname} // DTO의 nickname 사용
                    score={item.value} 
                    unit="권" 
                  />
                ))
            )}
          </div>

          {/* 내 랭킹 카드 */}
          <div className="my-ranking-card">
            {myReadingRank ? (
              <>
                <div className="my-ranking-info">
                   내 순위: <span className="my-ranking-highlight">{myReadingRank.rankPosition}위</span>
                </div>
                <div className="my-ranking-score">
                   <strong>{myReadingRank.value}권</strong> 읽음
                </div>
              </>
            ) : (
              <span className="my-ranking-text">
                 {user ? "아직 순위에 없습니다. 분발하세요!" : "로그인하고 랭킹에 도전하세요!"}
              </span>
            )}
          </div>
        </div>

        {/* --- 오른쪽: 챌린지 인기 순위 (또는 참여도 순위) --- */}
        <div className="ranking-column">
          <div className="ranking-header-section">
            <h2 className="ranking-title" style={{ color: '#57433D' }}>챌린지 랭킹</h2>
            <p className="ranking-desc">열정적으로 참여한 멤버들!</p>
          </div>

          <div className="ranking-list-wrapper">
            {challengeRankings.length === 0 ? (
                <div style={{padding:'20px', textAlign:'center', color:'#999'}}>
                    아직 집계된 랭킹이 없습니다.
                </div>
            ) : (
                challengeRankings.map(item => (
                  <RankingItem 
                    key={`challenge-${item.rankingId}`} 
                    rank={item.rankPosition} 
                    user={item.nickname} 
                    score={item.value} 
                    unit="점" 
                  />
                ))
            )}
          </div>
          
          <div className="ranking-footer-msg">
            * 랭킹은 매일 자정에 업데이트 됩니다.
          </div>
        </div>

      </div>
    </div>
  );
}
