import './HomePopularBooks.css';
import dummy from './dummy.png';

export function HomePopularBooks() {
  const popularBooks = [
    { id: 1, rank: 1, title: '달러구트 꿈 백화점', author: '이미예', rating: 4.8, reviews: 1234, cover: dummy },
    { id: 2, rank: 2, title: '불편한 편의점', author: '김호연', rating: 4.7, reviews: 987, cover: dummy },
    { id: 3, rank: 3, title: '아몬드', author: '손원평', rating: 4.6, reviews: 856, cover: dummy },
    { id: 4, rank: 4, title: '트렌드 코리아 2025', author: '김난도 외', rating: 4.5, reviews: 723, cover: dummy },
    { id: 5, rank: 5, title: '퓨처 셀프', author: '벤저민 하디', rating: 4.4, reviews: 654, cover: dummy }
  ];

  return (
    <section className="hpb-section">
      <div className="hpb-header">
        <h2 className="hpb-title">인기 도서</h2>
        <button className="hpb-more-btn">더보기</button>
      </div>

      <div className="hpb-list">
        {popularBooks.map(book => (
          <div key={book.id} className="hpb-item">
            <div className="hpb-rank">{book.rank}</div>
            <img src={book.cover} alt={book.title} className="hpb-cover" />
            <div className="hpb-details">
              <h3 className="hpb-title-small">{book.title}</h3>
              <p className="hpb-author-small">{book.author}</p>
              <div className="hpb-rating">
                <span className="hpb-star">⭐</span>
                <span className="hpb-rating-score">{book.rating}</span>
                <span className="hpb-rating-count">({book.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
