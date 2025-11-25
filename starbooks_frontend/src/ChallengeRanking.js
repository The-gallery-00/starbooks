import React, { useState } from 'react';
import './ChallengeRanking.css';
import Challenge from './Challenge';
import Ranking from './Ranking';

export default function ChallengeRanking() {
  const [activeTab, setActiveTab] = useState('challenge');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="challenge-ranking-container">
      <div className="tabs">
        <button
          className={`tab-item ${activeTab === 'challenge' ? 'active' : ''}`}
          onClick={() => handleTabClick('challenge')}
        >
          챌린지 목록
        </button>
        <button
          className={`tab-item ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => handleTabClick('ranking')}
        >
          스타북스 랭킹
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'challenge' ? <Challenge /> : <Ranking />}
      </div>
    </div>
  );
}