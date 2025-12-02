import React, { useState, useEffect } from "react";
import "./AddEditRecordModal.css";

export default function AddEditModal({ mode, record, onClose, onAdd, onEdit }) {
  const [bookTitle, setBookTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [passage, setPassage] = useState("");

  // 수정 모드일 때 기존 데이터 채우기
  useEffect(() => {
    if (mode === "edit" && record) {
      setBookTitle(record.bookTitle);
      setReview(record.review);
      setRating(record.rating);
      setPassage(record.passage);
    }
  }, [mode, record]);

  const handleSubmit = () => {
    const newData = {
      id: record?.id || Date.now(),
      bookTitle,
      review,
      rating,
      passage,
      timestamp: record?.timestamp || new Date().toLocaleString(),
    };

    if (mode === "add") onAdd(newData);
    else onEdit(newData);

    onClose();
  };

  return (
    <div className="aerm-modal-overlay">
      <div className="aerm-modal-box">
        <h2>{mode === "add" ? "독서 기록 추가" : "독서 기록 수정"}</h2>

        <label>도서명</label>
        <input
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />

        <label>도서평</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <label>추천 별점</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1점</option>
          <option value="2">2점</option>
          <option value="3">3점</option>
          <option value="4">4점</option>
          <option value="5">5점</option>
        </select>

        <label>좋아하는 구절</label>
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
        />

        <div className="aerm-modal-buttons">
          <button className="aerm-cancel-btn" onClick={onClose}>취소</button>
          <button className="aerm-submit-btn" onClick={handleSubmit}>
            {mode === "add" ? "추가하기" : "수정하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
