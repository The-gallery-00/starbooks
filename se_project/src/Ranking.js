import React, { useEffect, useState, useContext } from 'react';
import './Ranking.css';
import { UserContext } from './UserContext';
import api from './api/axiosInstance';

const RankingItem = ({ rank, user, score, profileIcon, unit }) => {
  const isTopThree = rank <= 3;

  return (
    <div className="ranking-row">
      <div className={`rank-num ${isTopThree ? 'top-tier' : ''}`}>
        {rank}
      </div>

      <div className="rank-profile">
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
  const [monthlyRanking, setMonthlyRanking] = useState([]);

  useEffect(() => {
    api.get('/api/rankings')
      .then(res => {
        const monthly = res.data.filter(item => item.rankingType === 'MONTHLY');
        setMonthlyRanking(monthly);
      })
      .catch(err => console.error('랭킹 데이터를 불러오지 못함:', err));
  }, []);

  const myNickname = user?.nickname;
  const myRanking = monthlyRanking.find(item => item.nickname === myNickname);

  const challengeRanking = [
    { rank: 1, title: '30일 독서 마라톤', score: 1200, profileIcon: '🥇' },
    { rank: 2, title: '하루 10페이지 챌린지', score: 1150, profileIcon: '🥈' },
    { rank: 3, title: '올해 100권 읽기 프로젝트', score: 1100, profileIcon: '🥉' },
    { rank: 4, title: '출근길 독서 루틴 챌린지', score: 980, profileIcon: '⭐' },
    { rank: 5, title: '장르 확장 독서 도전', score: 920, profileIcon: '⭐' },
    { rank: 6, title: '슬로우 리딩 챌린지', score: 880, profileIcon: '⭐' },
    { rank: 7, title: '독서 기록 습관 만들기', score: 850, profileIcon: '⭐' },
    { rank: 8, title: '책 리뷰 공유 챌린지', score: 830, profileIcon: '⭐' },
    { rank: 9, title: '한 주 한 권 읽기', score: 810, profileIcon: '⭐' },
    { rank: 10, title: '신간 탐방 챌린지', score: 790, profileIcon: '⭐' },
    { rank: 11, title: '작가별 탐구 챌린지', score: 770, profileIcon: '⭐' },
  ].slice(0, 10);

  const NoData = () => (
    <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
      아직 랭킹 데이터가 없습니다.
    </div>
  );

  return (
    <div className="ranking-page-container">
      <div className="ranking-columns">

        {/* 월간 다독 순위 */}
        <div className="ranking-column">
          <div className="ranking-header-section">
            <h2 className="ranking-title">월간 다독 순위</h2>
            <p className="ranking-desc">이달의 독서왕은 누구일까요?</p>
          </div>

          <div className="ranking-list-wrapper">
            {monthlyRanking.length === 0 ? (
              <NoData />
            ) : (
              monthlyRanking.slice(0, 10).map(item => (
                <RankingItem
                  key={item.rankingId}
                  rank={item.rankPosition}
                  user={item.nickname}
                  score={item.value}
                  profileIcon={item.rankPosition <= 3 ? '🥇' : '⭐'}
                  unit="권"
                />
              ))
            )}
          </div>

          <div className="my-ranking-card">
            {myRanking ? (
              <>
                <div className="my-ranking-info">
                  내 순위: <span className="my-ranking-highlight">{myRanking.rankPosition}위</span>
                </div>
                <div className="my-ranking-score">
                  <strong>{myRanking.value}권</strong> 읽음
                </div>
              </>
            ) : (
              <span className="my-ranking-text">아직 순위에 없습니다. 분발하세요!</span>
            )}
          </div>
        </div>

        {/* 챌린지 인기 순위 */}
        <div className="ranking-column">
          <div className="ranking-header-section">
            <h2 className="ranking-title" style={{ color: '#57433D' }}>챌린지 인기 순위</h2>
            <p className="ranking-desc">가장 핫한 챌린지들은?</p>
          </div>

          <div className="ranking-list-wrapper">
            {challengeRanking.length === 0 ? (
              <NoData />
            ) : (
              challengeRanking.map(item => (
                <RankingItem
                  key={`challenge-${item.rank}`}
                  rank={item.rank}
                  user={item.title}
                  score={item.score}
                  profileIcon={item.profileIcon}
                  unit="명"
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
