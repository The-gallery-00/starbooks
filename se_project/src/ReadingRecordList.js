import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import './ReadingRecordList.css';

const ReadingRecordList = ({ records }) => {
  const navigate = useNavigate(); // navigate 훅

  const recordsPerPage = 3;
  const maxPagesToShow = 3;
  const sortedRecords = records.sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = sortedRecords.slice(indexOfFirst, indexOfLast);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePrevGroup = () => {
    if (startPage === 1) return;
    setStartPage(startPage - maxPagesToShow);
    setCurrentPage(startPage - maxPagesToShow);
  };
  const handleNextGroup = () => {
    if (startPage + maxPagesToShow > totalPages) return;
    setStartPage(startPage + maxPagesToShow);
    setCurrentPage(startPage + maxPagesToShow);
  };

  const handleCardClick = (bookId) => {
    navigate(`/my-bookDetail`); // bookId를 params로 전달
  };

  return (
    <section className="rr-recent-records">
      <h2 className="rr-section-title">독서 기록 목록</h2>
      <div className="rr-record-list">
        {currentRecords.map(record => (
          <div
            key={record.id} 
            className="rr-record-card"
            onClick={() => handleCardClick(record.bookId)}
          >
            <div className="rr-record-header">
              <h3 className="rr-record-title">{record.bookTitle}</h3>
              <span className="rr-record-rating">⭐ {record.rating}</span>
            </div>
            <p className="rr-record-summary">{record.summary}</p>
            <p className="rr-record-date">{record.date}</p>
          </div>
        ))}
      </div>
      <div className="rr-pagination">
        <button onClick={handlePrevGroup} disabled={startPage === 1} className="rr-page-arrow">&lt;</button>
        {pageNumbers.map(num => (
          <button
            key={num}
            className={`rr-page-number ${currentPage === num ? 'active' : ''}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
        <button onClick={handleNextGroup} disabled={startPage + maxPagesToShow > totalPages} className="rr-page-arrow">&gt;</button>
      </div>
    </section>
  );
};

export default ReadingRecordList;
