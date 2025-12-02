import React from 'react';
import './CurrentRanking.css';

const CurrentRanking = () => (
  <div className="ranking-section">
    <h3>현재 랭킹</h3>
    <div className="ranking-list">
      {/* <p><span>전체 랭킹</span> 29위</p> */}
      <p><span>다독 랭킹</span> 17위</p>
      {/* <p><span>목표 달성 랭킹</span> 21위</p> */}
    </div>
  </div>
);

export default CurrentRanking;
