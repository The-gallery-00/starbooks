import './HomeMyReadingList.css';
import dummy from './dummy.png';
import { useNavigate } from 'react-router-dom';

export function HomeMyReadingList() {
  const navigate = useNavigate();

  const readingBooks = [
    { 
      id: 1, title: '소년이 온다', author: '한강', progress: '75', cover: "https://image.aladin.co.kr/product/4086/97/cover/8936434128_2.jpg", link: '#',
      allPages: 216, 
      description: '섬세한 감수성과 치밀한 문장으로 인간 존재의 본질을 탐구해온 작가 한강의 여섯번째 장편소설. 상처의 구조에 대한 투시와 천착의 서사를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명한다.'
    },
    { id: 2, title: '데미안', author: '헤르만 헤세', progress: '25', cover: "https://img1.daumcdn.net/thumb/R1280x0.fwebp/?fname=http://t1.daumcdn.net/brunch/service/user/7H8p/image/MsFtcopMcsD1h86nbkxGzcjv0mo.JPG", link: '#',
        allPages: 200,
        description: '2차 세계대전 중 많은 독일 젊은이들이 전장에 나가면서 군복 주머니 속에 품고 갔던 책. 어른이 되기 위해 보이지 않는 껍질을 깨고 고통스런 현실의 세계로 나서는 젊은이들을 그렸다. 지금까지도 젊은이들에게 통과의례처럼 읽히고 있는 명작을 새로 옮겼다.'
       },
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
