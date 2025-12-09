import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axiosInstance";
import "./BookInfo.css";

export default function BookInfo() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchPopularBooks = async () => {
    try {
      setLoading(true);

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
          pageSize: 1000, 
        },
      });

      const popularBooks = response.data.map((book, index) => ({
        id: index + 1,
        title: book.title,
        author: book.authors,
        publisher: book.publisher,
        image: book.bookImageUrl,
        isbn: book.isbn13,
      }));

      setResults(popularBooks);
      setIsSearched(false);

    } catch (error) {
      console.error("인기 도서 불러오기 실패:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPopularBooks();
  }, []);


  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get("/api/search/books", {
        params: {
          keyword: query,
          page: 1,
          size: 1000, // 검색도 모두 불러오기
        },
      });

      const searchedBooks = response.data.map((book, index) => ({
        id: index + 1,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        image: book.bookImageUrl,
        isbn: book.isbn,
      }));

      setResults(searchedBooks);
      setIsSearched(true);

    } catch (error) {
      console.error("도서 검색 실패:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };


  const handleReset = () => {
    setQuery(""); 
    setIsSearched(false);
    fetchPopularBooks();
  };

  const goToDetail = async (isbn) => {
    try {
      const response = await axios.get("/api/search/book/detail", {
        params: { isbn },
      });

      navigate(`/info-bookDetail/${isbn}`, { state: { book: response.data } });
    } catch (error) {
      console.error("도서 상세 조회 실패:", error);
    }
  };

  return (
    <div className="bi-book-info-container">
      <h2 className="bi-page-title">도서정보검색</h2>

      {/* 검색창 */}
      <div className="bi-search-area">
        <input
          type="text"
          placeholder="원하는 도서제목, 작가, 출판사를 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="bi-search-btn" onClick={handleSearch}>검색</button>
        <button className="bi-reset-btn" onClick={handleReset}>초기화</button>
      </div>

      {/* 검색 결과 혹은 인기 도서 */}
      {isSearched ? (
        <>
          <p className="bi-result-text">"{query}"에 대한 검색 결과</p>
          {results.length === 0 ? (
            <p className="bi-no-result-text">"{query}"에 대한 검색 결과가 없습니다.</p>
          ) : (
            <div className="bi-book-grid">
              {results.map((book) => (
                <div
                  key={book.id}
                  className="bi-book-card"
                  onClick={() => goToDetail(book.isbn)}
                >
                  <img src={book.image} alt={book.title} className="bi-book-image" />
                  <div className="bi-book-info">
                    <h4 className="bi-book-title">{book.title}</h4>
                    <p className="bi-book-author">{book.author}</p>
                    <p className="bi-book-publisher">{book.publisher}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <p className="bi-result-text">인기 도서 목록</p>
          
          {loading ? (
            <div className="bi-loading-container">
              <p className="bi-loading-text">불러오는 중...</p>
            </div>
          ) : (
            <div className="bi-book-grid">
              {results.map((book) => (
                <div
                  key={book.id}
                  className="bi-book-card"
                  onClick={() => goToDetail(book.isbn)}
                >
                  <img src={book.image} alt={book.title} className="bi-book-image" />
                  <div className="bi-book-info">
                    <h4 className="bi-book-title">{book.title}</h4>
                    <p className="bi-book-author">{book.author}</p>
                    <p className="bi-book-publisher">{book.publisher}</p>
                  </div>
                </div>
              ))}
            </div>
           )}
        </>
      )}
    </div>
  );
}
