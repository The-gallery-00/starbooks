// MyRecords.js
import React, { useState, useContext } from 'react';
import { FaPlus } from "react-icons/fa6";
import './MyRecords.css';
import AddRecordModal from './AddRecordModal';
import { UserContext } from './UserContext';

export default function MyRecords({ records, setRecords, bookTitle }) {
  const { user } = useContext(UserContext); // UserContext에서 현재 사용자 정보 가져오기 
  const [modalOpen, setModalOpen] = useState(false);

  const openAddModal = () => {
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  // 현재 도서 기록만 필터링
  const filteredRecords = records.filter(r => r.bookTitle === bookTitle);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return "⭐".repeat(fullStars) + (halfStar ? "½" : "");
  };

  if (!user) {
    return (
      <div className="myrecords-container">
        로그인 후 이용해주세요.
      </div>
    );
  }

  return (
    <div className="myrecords-container">
      {/* 헤더: 독서기록 + 추가 버튼 */}
      <header className="myrecords-header">
        <h3>{user.nickname}님의 독서 기록</h3>
        <button onClick={openAddModal}><FaPlus />기록 추가</button>
      </header>

      {/* 기록이 없을 때 */}
      {filteredRecords.length === 0 ? (
        <div className="mr-record-empty">
          아직 등록된 독서 기록이 없습니다. 새로운 기록을 추가해보세요!
        </div>
      ) : (
        <section className="mr-records-grid">
          {filteredRecords.map(record => (
            <div className="mr-record-card" key={record.id}>
              <div className="mr-record-title-actions">
                <h3 className="mr-record-book-title">{record.bookTitle}</h3>
                <div className="mr-record-actions">
                  <button className="mr-delete-btn" onClick={() => handleDelete(record.id)}>삭제</button>
                </div>
              </div>

              <div className="mr-record-content">
                <div className="mr-record-rating">{renderStars(record.rating)} ({record.rating})</div>
                <p className="mr-record-review">{record.review}</p>
                {record.passage && (
                  <p className="mr-record-passage">“{record.passage}”</p>
                )}
              </div>

              <p className="mr-record-timestamp">{record.timestamp}</p>
            </div>
          ))}
        </section>
      )}

      {/* 추가 모달 */}
      {modalOpen && (
        <div className="mr-modal-backdrop">
          <div className="mr-modal">
            <h4>독서 기록 추가</h4>

            <AddRecordModal
              mode="add"
              defaultBookTitle={bookTitle} // 추가 모드일 때만 전달
              onClose={() => setModalOpen(false)}
              onAdd={(r) => setRecords(prev => [{ ...r, bookTitle }, ...prev])}
              bookTitle={bookTitle}
            />

            <div className="mr-modal-footer">
              <button className="mr-btn-cancel" onClick={() => setModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
