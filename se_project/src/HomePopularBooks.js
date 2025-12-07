import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api/axiosInstance';
import './HomePopularBooks.css';

export function HomePopularBooks() {
  const navigate = useNavigate();
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const today = new Date();
        const endDt = today.toISOString().split("T")[0];
        const startDt = new Date(today.setMonth(today.getMonth() - 3))
          .toISOString()
          .split("T")[0];

        const response = await axios.get("/api/search/popular-books", {
          params: {
            startDt,
            endDt,
            pageNo: 1,
            pageSize: 5, // 상위 5권만 가져오기
          },
        });

        const books = response.data.map((book, index) => ({
          id: index + 1,
          rank: index + 1,
          title: book.title,
          author: book.authors,
          cover: book.bookImageUrl,
          isbn: book.isbn13,
        }));

        setPopularBooks(books);
      } catch (error) {
        console.error("인기 도서 불러오기 실패:", error);
      }
    };

    fetchPopularBooks();
  }, []);

  return (
    <section className="hpb-section">
      <div className="hpb-header">
        <h2 className="hpb-title">인기 도서</h2>
        <button className="hpb-more-btn" onClick={() => navigate('/bookinfo')}>더보기</button>
      </div>

      <div className="hpb-list">
        {popularBooks.map(book => (
          <div key={book.id} className="hpb-item">
            <div className="hpb-rank">{book.rank}</div>
            <img src={book.cover} alt={book.title} className="hpb-cover" />
            <div className="hpb-details">
              <h3 className="hpb-title-small">{book.title}</h3>
              <p className="hpb-author-small">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
