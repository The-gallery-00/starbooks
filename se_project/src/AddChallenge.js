import React, { useState, useContext } from "react";
import "./AddChallenge.css";
import { UserContext } from "./UserContext";
import api from "./api/axiosInstance";

export default function AddChallenge({ onClose, onCreate }) {
  const { user } = useContext(UserContext);
  
  const today = new Date().toISOString().split("T")[0];
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goalCount, setGoalCount] = useState(0);

  const handleCreate = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!title || !description || !goalCount || !endDate) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (parseInt(goalCount) < 1) {
      alert("목표 권수는 1권 이상이어야 합니다.");
      return;
    }

    const currentUserId = user.userId || user.id || user.memberId;
    
    if (!currentUserId) {
       console.error("유저 정보 오류:", user);
       alert("유저 ID를 찾을 수 없습니다. 다시 로그인해주세요.");
       return;
    }

    const requestData = {
      title: title,  
      description: description, 
      targetBooks: parseInt(goalCount), 
      startDate: today,  
      endDate: endDate,  
      creatorId: currentUserId 
    };

    console.log("스키마 맞춤 전송 데이터:", requestData);

    try {
      const response = await api.post("/api/challenges", requestData);

      if (response.status === 200 || response.status === 201) {
        alert("챌린지가 성공적으로 생성되었습니다!");
        if (onCreate) onCreate(response.data);
        onClose();
      }
    } catch (error) {
      console.error("생성 에러:", error);
      const msg = error.response?.data?.message || "서버와 통신 중 오류가 발생했습니다.";
      alert(`생성 실패: ${msg}`);
    }
  };

  return (
    <div className="add-challenge-overlay">
      <div className="add-challenge-container">
        <h3>새 챌린지 생성</h3>
        <form className="challenge-form" onSubmit={handleCreate}>
          <label>
            챌린지 이름
            <input 
              type="text" 
              placeholder="예: 한 달 5권 읽기"
              value={title} 
              maxLength={120}
              onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            챌린지 설명
            <textarea 
              placeholder="챌린지 내용을 적어주세요"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            마감일 설정
            <input 
              type="date" 
              value={endDate} 
              min={today} 
              onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <label>
            목표 권수
            <input 
              type="number" 
              min="1" 
              className="ac-goal-input"
              value={goalCount} 
              onChange={(e) => setGoalCount(e.target.value)} />
          </label>
        </form>
        <div className="ac-modal-buttons">
          <button onClick={onClose}>취소</button>
          <button onClick={handleCreate}>생성하기</button>
        </div>
      </div>
    </div>
  );
}