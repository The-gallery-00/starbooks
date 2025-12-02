import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Mock API 함수
const mockSearchApi = (query) => {
  console.log(`Searching for: ${query}`);
  if (query === "데미안") {
    return {
      totalResults: 10,
      categories: {
        book: {
          count: 5,
          results: [
            { id: 1, title: "데미안", author: "헤르만 헤세", cover: "https://via.placeholder.com/80x120" }
          ]
        },
        challenge: {
          count: 0,
          results: []
        },
        community: {
          count: 5,
          results: [{ id: 101, title: "데미안 독후감 스터디", type: "Post" }]
        }
      }
    };
  }

  return {
    totalResults: 25,
    categories: {
      book: { count: 10, results: [{ id: 2, title: "다른 도서", author: "작가명", cover: "https://via.placeholder.com/80x120" }] },
      challenge: { count: 5, results: [{ id: 201, title: "100일 챌린지", description: "매일 운동하기" }] },
      community: { count: 10, results: [{ id: 102, title: "자유게시판 글", description: "내용 요약" }] }
    }
  };
};

const GlobalSearch = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      setLoading(true);
      const data = mockSearchApi(query);
      setSearchData(data);
      setLoading(false);
    }
  }, [query]);

  if (loading) return <div className="loading-text">검색 중...</div>;
  if (!searchData) return <div className="no-query-text">검색어를 입력해주세요.</div>;

  const { totalResults, categories } = searchData;

  return (
    <div className="search-result-page">
      <h2 className="search-summary-text">
        "{query}"에 대한 검색결과가 <span className="result-count">{totalResults}건</span> 있습니다.
      </h2>

      <hr className="divider"/>

      <div className="category-results">

        {/* 도서 카테고리 */}
        <div className="category-section">
          <h3 className="category-title">도서정보 ({categories.book.count}건)</h3>
          {categories.book.count === 0 ? (
            <p className="no-results-message">"{query}"에 대한 검색결과가 없습니다.</p>
          ) : (
            <div className="book-card-list">
              {categories.book.results.map(book => (
                <div key={book.id} className="book-card">
                  <img src={book.cover} alt={book.title} className="book-cover"/>
                  <div className="book-info">
                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-author">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 챌린지 카테고리 */}
        <div className="category-section">
          <h3 className="category-title">챌린지 ({categories.challenge.count}건)</h3>
          {categories.challenge.count === 0 ? (
            <p className="no-results-message">"{query}"에 대한 검색결과가 없습니다.</p>
          ) : (
            <div className="challenge-card-list">
              {categories.challenge.results.map(ch => (
                <div key={ch.id} className="challenge-card">
                  <h4 className="challenge-title">{ch.title}</h4>
                  <p className="challenge-desc">{ch.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 커뮤니티 카테고리 */}
        <div className="category-section">
          <h3 className="category-title">커뮤니티 ({categories.community.count}건)</h3>
          {categories.community.count === 0 ? (
            <p className="no-results-message">"{query}"에 대한 검색결과가 없습니다.</p>
          ) : (
            <div className="community-card-list">
              {categories.community.results.map(post => (
                <div key={post.id} className="community-card">
                  <h4 className="community-title">{post.title}</h4>
                  <p className="community-desc">{post.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GlobalSearch;
