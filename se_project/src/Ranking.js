import React, { useContext } from 'react';
import './Ranking.css';
import { UserContext } from './UserContext'; 

// 더미 데이터
const MONTHLY = [
  { rank: 1, user: '한달의책왕', score: 320, profileIcon: '🥇' },
  { rank: 2, user: '책덕후24시', score: 298, profileIcon: '🥈' },
  { rank: 3, user: '달빛독서가', score: 285, profileIcon: '🥉' },
  { rank: 4, user: '김스타', score: 240, profileIcon: '⭐' },
  { rank: 5, user: '책은밥이다', score: 220, profileIcon: '⭐' },
  { rank: 6, user: '독서마라톤', score: 210, profileIcon: '⭐' },
  { rank: 7, user: '페이지터너', score: 195, profileIcon: '⭐' },
];

const CHALLENGE_POPULAR = [
  { rank: 1, user: '챌린지마스터', score: 1200, profileIcon: '🥇' },
  { rank: 2, user: '오늘도읽자', score: 1150, profileIcon: '🥈' },
  { rank: 3, user: '지식탐험가', score: 1100, profileIcon: '🥉' },
  { rank: 4, user: '김스타', score: 980, profileIcon: '⭐' },
  { rank: 5, user: '새벽의독서가', score: 920, profileIcon: '⭐' },
  { rank: 6, user: '북러버', score: 880, profileIcon: '⭐' },
  { rank: 7, user: '글쓰기중독', score: 850, profileIcon: '⭐' },
];

const RankingItem = ({ rank, user, score, profileIcon, unit }) => {
  const isTopThree = rank <= 3;
  
  return (
    <div className="ranking-row">
      <div className={`rank-num ${isTopThree ? 'top-tier' : ''}`}>
        {rank}
      </div>
      
      <div className="rank-profile">
        {isTopThree && <span className="medal-icon">{profileIcon}</span>}
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
  const myNickname = user?.nickname || user?.name || null;

  const findMyEntry = (data) => (myNickname ? data.find(item => item.user === myNickname) : null);
  const monthlyMy = findMyEntry(MONTHLY);

  return (
    <div className="ranking-page-container">
      
      <div className="ranking-columns">
        
        <div className="ranking-column">
          <div className="ranking-header-section">
            <h2 className="ranking-title">월간 다독 순위</h2>
            <p className="ranking-desc">이달의 독서왕은 누구일까요?</p>
          </div>

          <div className="ranking-list-wrapper">
            {MONTHLY.map(item => (
              <RankingItem key={`monthly-${item.rank}`} {...item} unit="권" />
            ))}
          </div>

          <div className="my-ranking-card">
            {monthlyMy ? (
              <>
                <div className="my-ranking-info">
                   내 순위: <span className="my-ranking-highlight">{monthlyMy.rank}위</span>
                </div>
                <div className="my-ranking-score">
                   <strong>{monthlyMy.score}권</strong> 읽음
                </div>
              </>
            ) : (
              <span className="my-ranking-text">랭킹 도전! 독서를 시작해보세요.</span>
            )}
          </div>
        </div>

        <div className="ranking-column">
          <div className="ranking-header-section">
            <h2 className="ranking-title" style={{ color: '#57433D' }}>챌린지 인기 순위</h2>
            <p className="ranking-desc">가장 핫한 챌린지 참여 멤버들!</p>
          </div>

          <div className="ranking-list-wrapper">
            {CHALLENGE_POPULAR.map(item => (
              <RankingItem key={`challenge-${item.rank}`} {...item} unit="명" />
            ))}
          </div>
          
          <div className="ranking-footer-msg">
            * 챌린지 순위는 참여 인원 기준입니다.
          </div>
        </div>

      </div>
    </div>
  );
}