import React, { useState } from "react";
import "./AddChallenge.css";

export default function AddChallenge({ onClose, onCreate }) {
  const today = new Date().toISOString().split("T")[0];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goalCount, setGoalCount] = useState(0);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !description || !goalCount || !endDate) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (parseInt(goalCount) < 1) {
      alert("목표 권수는 1권 이상이어야 합니다.");
      return;
    }

    onCreate({ title, description, endDate, maxBooks: parseInt(goalCount) });
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
              placeholder="챌린지 이름을 입력해주세요"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            챌린지 설명
            <textarea 
              placeholder="챌린지 설명을 작성해주세요"
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
