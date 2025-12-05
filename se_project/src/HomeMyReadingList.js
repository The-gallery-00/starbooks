import './HomeMyReadingList.css';
import dummy from './dummy.png';
import { useNavigate } from 'react-router-dom';

export function HomeMyReadingList() {
  const navigate = useNavigate();

  const readingBooks = [
    { id: 1, title: '데미안', author: '헤르만 헤세', progress: 65, cover: dummy },
    { id: 2, title: '1984', author: '조지 오웰', progress: 42, cover: dummy },
    { id: 3, title: '어린왕자', author: '생텍쥐페리', progress: 88, cover: dummy }
  ];

  return (
    <section className="hmrl-section">
      <div className="hmrl-header">
        <h2>읽고 있는 책</h2>
        <button className="hmrl-more-btn" onClick={() => navigate('/library')}>
          더보기
        </button>
      </div>

      {readingBooks.length > 0 ? (
        <div className="hmrl-grid">
            {readingBooks.map(book => (
            <div key={book.id} className="hmrl-card">
                <div className="hmrl-cover-wrapper">
                <img src={book.cover} alt={book.title} className="hmrl-cover" />
                </div>
                <div className="hmrl-info">
                <h3 className="hmrl-title">{book.title}</h3>
                <p className="hmrl-author">{book.author}</p>
                <div className="hmrl-progress-wrapper">
                    <div className="hmrl-progress-bar">
                    <div 
                        className="hmrl-progress-fill" 
                        style={{ width: `${book.progress}%` }}
                    />
                    </div>
                    <span className="hmrl-progress-text">{book.progress}%</span>
                </div>
                </div>
            </div>
            ))}
        </div>
      ) : (
        <p className="hmrl-empty-message">
          아직 추가된 책이 없습니다. 독서를 시작해 보세요!
        </p>
      )}
    </section>
  );
}
