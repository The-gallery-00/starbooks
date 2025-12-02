import React from 'react';
import './Ranking.css';

// 랭킹 더미 데이터
const DUMMY_RANKINGS = [
  { rank: 1, user: '빛나는독서왕', score: 580, profileIcon: '🥇' },
  { rank: 2, user: '책덕후24시', score: 550, profileIcon: '🥈' },
  { rank: 3, user: '지식탐험가', score: 490, profileIcon: '🥉' },
  { rank: 4, user: '새벽의독서가', score: 420, profileIcon: '⭐' },
  { rank: 5, user: '책은밥이다', score: 380, profileIcon: '⭐' },
  { rank: 6, user: '알라딘의서재', score: 350, profileIcon: '⭐' },
];

const RankingItem = ({ rank, user, score, profileIcon }) => {
  const isTopThree = rank <= 3;
  return (
    <div className={`r-ranking-item ${isTopThree ? 'top-three' : ''}`}>
      <span className="rank-number">{rank}</span>
      <div className="user-info">
        <span className="profile-icon">{profileIcon}</span>
        <span className="user-name">{user}</span>
      </div>
      <span className="r-ranking-score">{score}점</span>
    </div>
  );
};

export default function Ranking() {
  return (
    <div className="r-ranking-list-container">
      <h3 className="r-ranking-header">주간 다독 랭킹</h3>
      <p className="r-ranking-description">가장 많은 책을 읽은 스타북스 회원 순위입니다. </p>
      
      <div className="r-ranking-list">
        {DUMMY_RANKINGS.map(item => (
          <RankingItem key={item.rank} {...item} />
        ))}
      </div>
      
      <div className="my-ranking-info">
        <p>나의 순위: <span className="my-rank-number">15위</span> (300점)</p>
        <p className="tip-text">독서 인증을 통해 점수를 올려보세요!</p>
      </div>
    </div>
  );
}