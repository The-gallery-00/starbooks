// ProgressEditModal.js
import React, { useState } from "react";
import "./ProgressEditModal.css";

export default function ProgressEditModal({ progress, onSave, onClose }) {
  const [tempProgress, setTempProgress] = useState(progress);

  return (
    <div className="progress-modal-backdrop">
      <div className="progress-modal">
        <h3 className="progress-title">진행률 수정</h3>

        <div className="progress-input-box">
          <label>현재 진행률 (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={tempProgress}
            onChange={(e) => setTempProgress(Number(e.target.value))}
          />
        </div>

        <div className="progress-modal-buttons">
          <button className="save-btn" onClick={() => onSave(tempProgress)}>
            저장
          </button>
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
