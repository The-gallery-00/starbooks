// MyRecords.js
import React, { useState } from 'react';
import './MyRecords.css';
import AddEditRecordModal from './AddEditRecordModal';

export default function MyRecords({ records, setRecords, bookTitle }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit
  const [editingRecord, setEditingRecord] = useState(null);

  const openAddModal = () => {
    setMode("add");
    setEditingRecord(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    const target = records.find(r => r.id === id);
    setMode("edit");
    setEditingRecord(target);
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

  return (
    <div className="myrecords-container">
      {/* 헤더: 독서기록 + 추가 버튼 */}
      <header className="myrecords-header">
        <h2>독서 기록</h2>
        <button onClick={openAddModal}>➕ 기록 추가</button>
      </header>

      {/* 기록이 없을 때 */}
      {filteredRecords.length === 0 ? (
        <div className="record-empty">
          아직 등록된 독서 기록이 없습니다. 새로운 기록을 추가해보세요!
        </div>
      ) : (
        <section className="records-grid">
          {filteredRecords.map(record => (
            <div className="record-card" key={record.id}>
              <div className="record-title-actions">
                <h3 className="record-book-title">{record.bookTitle}</h3>
                <div className="record-actions">
                  <button className="edit-btn" onClick={() => openEditModal(record.id)}>수정</button>
                  <button className="delete-btn" onClick={() => handleDelete(record.id)}>삭제</button>
                </div>
              </div>

              <div className="record-content">
                <div className="record-rating">{renderStars(record.rating)} ({record.rating})</div>
                <p className="record-review">{record.review}</p>
                {record.passage && (
                  <p className="record-passage">“{record.passage}”</p>
                )}
              </div>

              <p className="record-timestamp">{record.timestamp}</p>
            </div>
          ))}
        </section>
      )}

      {/* 추가/수정 모달 */}
      {modalOpen && (
        <div className="mr-modal-backdrop">
          <div className="mr-modal">
            <h4>{mode === "add" ? "독서 기록 추가" : "독서 기록 수정"}</h4>

            <AddEditRecordModal
              mode={mode}
              record={editingRecord}
              onClose={() => setModalOpen(false)}
              onAdd={(r) => setRecords(prev => [{ ...r, bookTitle }, ...prev])}
              onEdit={(r) => setRecords(prev => prev.map(rec => rec.id === r.id ? { ...r, bookTitle } : rec))}
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
