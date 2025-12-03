// BookInfo.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookInfo.css";

import dummy from "./dummy.png"

export default function BookInfo() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const navigate = useNavigate();

  // 더미 데이터
  const dummyBooks = [
    {
      id: 1,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "부모를 잃고 이모 가족에게서 불우하게 자란 해리 포터가 자신이 마법사라는 사실을 알게 되면서 시작됩니다. 그는 11살 생일에 호그와트 마법학교에 입학하여 덤블도어, 스네이프, 맥고나걸 교수 등을 만나고, 새로운 친구 론과 헤르미온느와 함께 호그와트 생활을 시작합니다. 셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서 부모를 잃고 이모 가족에게서 불우하게 자란 해리 포터가 자신이 마법사라는 사실을 알게 되면서 시작됩니다. 그는 11살 생일에 호그와트 마법학교에 입학하여 덤블도어, 스네이프, 맥고나걸 교수 등을 만나고, 새로운 친구 론과 헤르미온느와 함께 호그와트 생활을 시작합니다. 셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서  부모를 잃고 이모 가족에게서 불우하게 자란 해리 포터가 자신이 마법사라는 사실을 알게 되면서 시작됩니다. 그는 11살 생일에 호그와트 마법학교에 입학하여 덤블도어, 스네이프, 맥고나걸 교수 등을 만나고, 새로운 친구 론과 헤르미온느와 함께 호그와트 생활을 시작합니다. 셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서 셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼모트의 위협에 맞서셋은 학교에 숨겨진 '마법사의 돌'을 지키기 위해 볼드모트의 위협에 맞서",
    },
    {
      id: 2,
      title: "나미야 잡화점의 기적",
      author: "히가시노 게이고",
      publisher: "현대문학",
      image: dummy,
      description: "감성 미스터리",
    },
    {
      id: 3,
      title: "불편한 편의점",
      author: "김호연",
      publisher: "비채",
      image: dummy,
      description: "한국 장편소설",
    },
    {
      id: 4,
      title: "데미안",
      author: "헤르만 헤세",
      publisher: "민음사",
      image: dummy,
      description: "성장 소설",
    },
    {
      id: 5,
      title: "미드나잇 라이브러리",
      author: "매트 헤이그",
      publisher: "인플루엔셜",
      image: dummy,
      description: "철학 판타지",
    },
    {
      id: 6,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 7,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 8,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 9,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 10,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 11,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 12,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 13,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 14,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 15,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 16,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 17,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 18,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 19,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 20,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 21,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 22,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 23,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 24,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },
    {
      id: 25,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      publisher: "문학사",
      image: dummy,
      description: "판타지 소설",
    },


  ];

  const handleSearch = () => {
    if (!query.trim()) return;

    // 제목(title), 작가(author), 출판사(publisher) 모두 검색
    const filtered = dummyBooks.filter((book) => {
    const lower = query.toLowerCase();
      return (
        book.title.toLowerCase().includes(lower) ||
        book.author.toLowerCase().includes(lower) ||
        book.publisher.toLowerCase().includes(lower)
      );
    });

    setResults(filtered);
    setIsSearched(true);

    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleReset = () => {
    setQuery("");
    setResults([]);
    setIsSearched(false);
  };

  const goToDetail = (book) => {
    navigate(`/info-bookDetail`, { state: { book } });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedBooks = results.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* 검색 결과 문구 */}
      {isSearched && (
        <p className="bi-result-text">"{query}"에 대한 검색 결과</p>
      )}

      {/* 검색 결과 없음 */}
      {isSearched && results.length === 0 && (
        <p className="bi-no-result-text">
          "{query}"에 대한 검색 결과가 없습니다.
        </p>
      )}

      {/* 결과 카드 */}
      <div className="bi-book-grid">
        {selectedBooks.map((book) => (
          <div
            key={book.id}
            className="bi-book-card"
            onClick={() => goToDetail(book)}
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

      {/* 페이지네이션 */}
      {results.length > itemsPerPage && (
        <div className="bi-pagination">
          <button
            className="bi-page-btn"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ＜
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className={
                  page === currentPage ? "bi-page-number active" : "bi-page-number"
                }
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="bi-page-btn"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ＞
          </button>
        </div>
      )}
    </div>
  );
}
