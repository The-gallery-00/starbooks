import React, { useState } from 'react';
import './MyRecords.css';
import AddEditRecordModal from './AddEditRecordModal';

const DUMMY_RECORDS = [
  {
    id: 1,
    bookTitle: "데미안",
    review: "정말 인상깊게 읽었습니다.",
    rating: 5,
    passage: "새는 알에서 나오려고 투쟁한다...",
    timestamp: "2025/11/12 16:00",
  },
  {
    id: 2,
    bookTitle: "클린 아키텍처",
    review: "소프트웨어 아키텍처에 대한 통찰을 제공합니다.",
    rating: 4,
    passage: "클린 아키텍처는 프레임워크와...",
    timestamp: "2025/11/08 10:30",
  },
];

const RecordCard = ({ record, onEdit, onDelete }) => (
  <div className="record-card">
    <div className="record-title-actions">
      <h2 className="record-book-title">{record.bookTitle}</h2>
      <div className="record-actions">
        <button className="edit-btn" onClick={() => onEdit(record.id)}>수정</button>
        <button className="delete-btn" onClick={() => onDelete(record.id)}>삭제</button>
      </div>
    </div>

    <div>
      <p className="record-section-title">• 도서평</p>
      <p className="record-review">{record.review}</p>

      <p className="record-section-title">• 추천 별점</p>
      <p className="record-rating">⭐ {record.rating}</p>

      <p className="record-section-title">• 좋아하는 구절</p>
      <p className="record-passage">“{record.passage}”</p>
    </div>

    <p className="record-timestamp">{record.timestamp}</p>
  </div>
);

export default function MyRecords() {
  const [records, setRecords] = useState(DUMMY_RECORDS);
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

  const handleAddRecord = (newRecord) => {
    setRecords(prev => [
      {
        ...newRecord,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const handleUpdateRecord = (updatedRecord) => {
    setRecords(prev =>
      prev.map(r => (r.id === updatedRecord.id ? updatedRecord : r))
    );
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="myrecords-container">
      <header className="myrecords-header">
        <h1>독서 기록</h1>
        <button onClick={openAddModal}>➕ 독서 기록 추가</button>
      </header>

      {records.length === 0 ? (
        <div className="record-empty">
          아직 등록된 독서 기록이 없습니다. 새로운 기록을 추가해보세요!
        </div>
      ) : (
        <section>
          {records.map(record => (
            <RecordCard
              key={record.id}
              record={record}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}

      {modalOpen && (
        <AddEditRecordModal
          mode={mode}
          record={editingRecord}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddRecord}
          onEdit={handleUpdateRecord}
        />
      )}
    </div>
  );
}
