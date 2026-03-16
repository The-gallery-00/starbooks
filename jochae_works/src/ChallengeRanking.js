import React, { useState, useEffect } from 'react';
import './ChallengeRanking.css';
import Challenge from './Challenge';
import Ranking from './Ranking';

export default function ChallengeRanking() {
  const [activeTab, setActiveTab] = useState('challenge');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="challenge-ranking-container">
      <div className="cr-tabs">
        <button
          className={`cr-tab-item ${activeTab === 'challenge' ? 'active' : ''}`}
          onClick={() => handleTabClick('challenge')}
        >
          챌린지 목록
        </button>
        <button
          className={`cr-tab-item ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => handleTabClick('ranking')}
        >
          스타북스 랭킹
        </button>
      </div>

      <div className="cr-tab-content">
        {activeTab === 'challenge' ? <Challenge /> : <Ranking />}
      </div>
    </div>
  );
}