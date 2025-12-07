import React, { useState, useEffect, useContext } from "react";
import "./AddRecordModal.css";
import { UserContext } from "./UserContext";

export default function AddRecordModal({ defaultBookTitle, onClose, onAdd }) {
  const { user } = useContext(UserContext);
  const [bookTitle, setBookTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [passage, setPassage] = useState("");

  useEffect(() => {
    if (defaultBookTitle) {
      setBookTitle(defaultBookTitle);
    }
  }, [defaultBookTitle]);

  const handleSubmit = () => {
    if (!bookTitle.trim() || !review.trim() || !rating || !passage.trim()) {
      alert("모든 항목을 입력해야 합니다.");
      return;
    }

    const newData = {
      id: Date.now(),
      bookTitle,
      review,
      rating,
      passage,
      timestamp: new Date().toLocaleString(),
      userId: user?.id,
    };

    onAdd(newData);
    onClose();
  };

  const handleReviewChange = (e) => {
    const text = e.target.value.slice(0, 1000);
    setReview(text);
  };

  const handlePassageChange = (e) => {
    const text = e.target.value.slice(0, 1000);
    setPassage(text);
  };

  return (
    <div className="aerm-modal-overlay">
      <div className="aerm-modal-box">
        <h2>독서 기록 추가</h2>

        <label>도서명</label>
        <input
          value={bookTitle}
          placeholder="도서명을 입력하세요"
          onChange={(e) => setBookTitle(e.target.value)}
        />

        <label>도서평</label>
        <textarea
          value={review}
          placeholder="도서평을 작성해주세요"
          onChange={handleReviewChange}
        />
        <div className="aerm-char-counter">{review.length}/1000</div>

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
          placeholder="좋아하는 구절을 작성해주세요"
          onChange={handlePassageChange}
        />
        <div className="aerm-char-counter">{passage.length}/1000</div>

        <div className="aerm-modal-buttons">
          <button className="aerm-cancel-btn" onClick={onClose}>취소</button>
          <button className="aerm-submit-btn" onClick={handleSubmit}>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
