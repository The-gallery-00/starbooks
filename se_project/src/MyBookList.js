import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBookList.css';

const BookCard = ({ id, title, author, progress, cover, activeTab }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/my-bookDetail`, { state: { bookId: id, type: activeTab } });
  };

  return (
    <div className="mbl-book-card-link" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="mbl-book-card">
        <img src={cover} alt={title} className="mbl-book-cover" />
        <div className="mbl-book-info">
          <p className="mbl-book-title">{title}</p>
          <p className="mbl-book-author">{author}</p>
          {activeTab !== 'wishlist' && (
            <>
              <div className="mbl-progress-bar-container">
                <div className="mbl-progress-bar" style={{ width: `${progress}` }}></div>
              </div>
              <p className="mbl-progress-text">{progress}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MyBookList = ({ myBooks }) => {
  const [activeTab, setActiveTab] = useState('reading');

  const renderTabContent = () => {
    const books = myBooks[activeTab];
    return (
      <div className="mbl-book-list-container-tab">
        {books && books.length > 0 ? (
          books.map((book, index) => (
            <BookCard key={book.id || index} {...book} activeTab={activeTab} />
          ))
        ) : (
          <p className="no-books">등록된 도서가 없습니다.</p>
        )}
      </div>
    );
  };

  return (
    <section className="library-section">
      <div className="mbl-tabs">
        {['reading', 'finished', 'wishlist'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'reading' ? '읽고 있는 도서' : tab === 'finished' ? '읽은 도서' : '찜한 도서'}
          </button>
        ))}
      </div>
      <div className="mbl-tab-content">{renderTabContent()}</div>
    </section>
  );
};

export default MyBookList;
