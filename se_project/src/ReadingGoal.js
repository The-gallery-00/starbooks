import React, { useEffect, useState, useContext } from 'react';
import './ReadingGoal.css';
import { UserContext } from './UserContext';
import api from "./api/axiosInstance";

const ReadingGoal = () => {
  const { user } = useContext(UserContext);

  const [goalData, setGoalData] = useState({
    targetPages: 0,
    achievedPages: 0,
  });
  const [percent, setPercent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [inputPages, setInputPages] = useState(0);
  const [progressInput, setProgressInput] = useState(0);

  useEffect(() => {
    const calc = goalData.targetPages > 0
      ? Math.round((goalData.achievedPages / goalData.targetPages) * 100)
      : 0;
    setPercent(calc > 100 ? 100 : calc);
  }, [goalData]);

  const fetchGoalAndToday = async () => {
    if (!user) return { targetPages: 0, achievedPages: 0 };
    try {
      const goalRes = await api.get(`/api/users/${user.userId}/daily-goal`);
      const todayRes = await api.get(`/api/users/${user.userId}/today-pages`);

      const targetPages = goalRes.data?.targetPages || 0;
      const achievedPages = todayRes.data || 0;

      setGoalData({ targetPages, achievedPages });
      return { targetPages, achievedPages }; 
    } catch (error) {
      console.error("목표 및 오늘 읽은 페이지 불러오기 실패:", error);
      return { targetPages: 0, achievedPages: 0 }; 
    }
  };


  const saveNewGoal = async () => {
    if (!user || inputPages <= 0) return;
    try {
      const res = await api.patch(
        `/api/users/${user.userId}/daily-goal`,
        null,
        { params: { goalPages: inputPages } }
      );

      const todayRes = await api.get(`/api/users/${user.userId}/today-pages`);

      setGoalData({
        targetPages: res.data.dailyPageGoal || 0,
        achievedPages: todayRes.data || 0
      });

      setProgressInput(0);
      setShowModal(false);
    } catch (error) {
      console.error("목표 저장 실패:", error);
    }
  };

  const addProgress = async (amount = 0) => {
    if (!user || amount <= 0) return;

    const newTotal = goalData.achievedPages + amount;

    if (goalData.targetPages > 0 && newTotal > goalData.targetPages) {
      alert("이미 목표를 달성하였습니다!");
      return;
    }

    try {
      const res = await api.patch(
        `/api/users/${user.userId}/today-pages`,
        null,
        { params: { pagesRead: newTotal } }
      );

      setGoalData(prev => ({
        ...prev,
        achievedPages: res.data.updatedTodayPages || newTotal
      }));

      setProgressInput(0);
    } catch (error) {
      console.error("오늘 읽은 페이지 추가 실패:", error);
    }
  };

  const resetGoalInput = () => setInputPages(0);
  const handleModalClose = () => { setShowModal(false); setProgressInput(0); };

  const handleGoalSetup = async () => {
    let dto;
    try {
      dto = await fetchGoalAndToday();
    } catch (e) {
      console.error("목표 및 오늘 읽은 페이지 fetch 실패:", e);
    }

    setInputPages(dto?.targetPages || 0);
    setProgressInput(0);
    setShowModal(true);
  };


  const isGoalComplete = () => goalData.targetPages > 0 && goalData.achievedPages >= goalData.targetPages;

  useEffect(() => {
    if (!user) return;
    fetchGoalAndToday();
  }, [user]);

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
          goalData.targetPages > 0 ? (
            <p className="rg-goal-desc">
              매일매일 <span className="rg-target-value">{goalData.targetPages}</span>페이지 읽기
            </p>
          ) : (
            <p className="rg-goal-desc rg-no-goal-set">아직 목표가 설정되지 않았습니다.</p>
          )
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

              <div className="rg-modal-buttons">
                <button className="rg-btn-cancel" onClick={resetGoalInput}>초기화</button>
                <button className="rg-btn-save" onClick={saveNewGoal}>저장</button>
              </div>

              <p>현재까지 {goalData.achievedPages} 페이지 읽음</p>

              <p>오늘 읽은 페이지</p>
              <div className="rg-progress-input-wrap">
                <input
                  type="number"
                  min="0"
                  value={progressInput}
                  onChange={e => setProgressInput(Number(e.target.value))}
                />
                <button
                  className="rg-btn-add"
                  onClick={() => addProgress(progressInput)}
                  disabled={goalData.achievedPages >= goalData.targetPages}
                >
                  추가
                </button>
              </div>

              <div className="rg-modal-buttons">
                <button className="rg-modal-btn-save" onClick={handleModalClose}>닫기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingGoal;
