import React, { useEffect, useState } from 'react';
import './ReadingGoal.css';

const ReadingGoal = () => {
  const [goalData, setGoalData] = useState({
    targetPages: 0,
    achievedPages: 0,
  });

  const [percent, setPercent] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [inputPages, setInputPages] = useState(goalData.targetPages);
  const [progressInput, setProgressInput] = useState(0); // 오늘 읽은 페이지 입력

  useEffect(() => {
    let calc = 0;
    if (goalData.targetPages > 0) {
      calc = Math.round((goalData.achievedPages / goalData.targetPages) * 100);
    }
    setPercent(calc > 100 ? 100 : calc);
  }, [goalData]);

  // 목표 저장
  const saveNewGoal = () => {
    const newGoal = {
      targetPages: inputPages,
      achievedPages: 0,
    };
    setGoalData(newGoal);
    setProgressInput(0);
  };

  // 입력 초기화
  const resetGoalInput = () => {
    setInputPages(0);
  };

  // 오늘 읽은 페이지 추가
  const addProgress = (amount = 0) => {
    setGoalData(prev => ({
      ...prev,
      achievedPages: prev.achievedPages + amount
    }));
    setProgressInput(0);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setProgressInput(0);
  };

  const handleGoalSetup = () => {
    setInputPages(goalData.targetPages);
    setProgressInput(0);
    setShowModal(true);
  };

  const isGoalComplete = () => {
    return goalData.targetPages > 0 && goalData.achievedPages >= goalData.targetPages;
  };

  return (
    <div className="goal-section">
      <div className="rg-goal-header">
        <h3>독서 목표</h3>
        <div className="rg-tab-menu">
          <button onClick={handleGoalSetup}>목표 설정</button>
        </div>
      </div>

      <div className="rg-goal-content">
        {isGoalComplete() ? (
          <p className="rg-goal-desc goal-set">일일 목표를 달성하였습니다</p>
        ) : (
          <>
            {goalData.targetPages > 0 ? (
              <p className="rg-goal-desc">
                매일매일 <span className="rg-target-value">{goalData.targetPages}</span>페이지 읽기
              </p>
            ) : (
              <p className="rg-goal-desc rg-no-goal-set">아직 목표가 설정되지 않았습니다.</p>
            )}
          </>
        )}

        <div className="rg-progress-chart">
          <div className="chart-circle" style={{ '--percent': percent }}>
            <span className="rg-percent-text">{percent}%</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="rg-modal-overlay">
          <div className="rg-modal-content">
            <h3>페이지 목표 설정</h3>

            <div className="rg-goal-input">
              <p>목표 페이지 입력</p>
              <input
                type="number"
                min="1"
                value={inputPages}
                onChange={e => setInputPages(Math.max(0, Number(e.target.value)))}
              />

              {/* 저장 및 초기화 */}
              <div className="rg-modal-buttons">
                <button className="rg-btn-cancel" onClick={resetGoalInput}>초기화</button>
                <button className="rg-btn-save" onClick={saveNewGoal}>저장</button>
              </div>

              {/* 이전 누적량 */}
              <p>현재까지 {goalData.achievedPages} 페이지 읽음</p>

              {/* 오늘 읽은 페이지 입력 */}
              <p>오늘 읽은 페이지</p>
              <div className="rg-progress-input-wrap">
                <input
                  type="number"
                  min="0"
                  value={progressInput}
                  onChange={e => setProgressInput(Number(e.target.value))}
                />
                <button className="rg-btn-add" onClick={() => addProgress(progressInput)}>
                  추가
                </button>
              </div>

              <div className="rg-modal-buttons">
                <button className="rg-modal-btn-cancel" onClick={handleModalClose}>취소</button>
                <button className="rg-modal-btn-save" onClick={handleModalClose}>완료</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingGoal;
