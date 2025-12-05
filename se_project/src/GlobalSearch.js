//GlobalSearch.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GlobalSearch.css';

// Mock API (데이터)
const mockSearchApi = (query) => {
  const books = [
    { id: 1, title: '데미안', author: '헤르만 헤세', publisher: '민음사' },
    { id: 2, title: '어린왕자', author: '생텍쥐페리', publisher: '문학동네' },
    { id: 3, title: '지리학 입문', author: '김철수', publisher: '알파북' },
    { id: 4, title: '데이터 분석 입문', author: '이영희', publisher: '한빛미디어' },
    { id: 5, title: '참 좋은 책', author: '박작가', publisher: '창비' },
    { id: 6, title: '리액트 다루기', author: '김개발', publisher: '길벗' },
  ];

  const challenges = [
    { id: 201, title: '100일 독서 챌린지', description: '매일 최소 10쪽씩 읽고 인증하기' },
    { id: 202, title: '한달에 5권 읽기', description: '월간 독서 목표 달성 프로젝트' },
    { id: 203, title: '하루 1장 쓰기 챌린지', description: '글쓰기 근육을 기르는 매일 리뷰' },
  ];

  const community = [
    { id: 301, title: '데미안 독후감 스터디 모집', description: '매주 금요일 저녁 8시 온라인' },
    { id: 302, title: '안보는 책 서로 교환하실 분', description: '상태 좋은 인문학 서적 교환 원합니다.' },
    { id: 303, title: '효율적인 독서 노트 작성 팁', description: '노션으로 독서 기록 관리하는 방법 공유해요.' },
  ];

  return {
    categories: {
      book: { count: books.length, results: books },
      challenge: { count: challenges.length, results: challenges },
      community: { count: community.length, results: community }
    }
  };
};

const GlobalSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 탭 상태 관리: 기본값은 'all'이지만, 사이드바에는 'all' 버튼이 없습니다.
  // 사용자가 사이드바를 누르면 해당 카테고리로 변경됩니다.
  const [activeTab, setActiveTab] = useState('all');

  // 더보기 확장 상태 (전체 보기 모드일 때만 사용)
  const [expanded, setExpanded] = useState({ book: false, challenge: false, community: false });

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  // 쿼리가 바뀌면 탭을 'all'로 초기화하여 전체 결과를 먼저 보여줍니다.
  useEffect(() => {
    setActiveTab('all');
  }, [query]);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const raw = mockSearchApi(query);
      const q = query.trim().toLowerCase();

      // 필터링 로직
      const filterBooks = raw.categories.book.results.filter(b =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
      const filterChallenges = raw.categories.challenge.results.filter(c =>
        c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
      const filterCommunity = raw.categories.community.results.filter(p =>
        p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );

      setSearchData({
        totalResults: filterBooks.length + filterChallenges.length + filterCommunity.length,
        categories: {
          book: { count: filterBooks.length, results: filterBooks },
          challenge: { count: filterChallenges.length, results: filterChallenges },
          community: { count: filterCommunity.length, results: filterCommunity }
        }
      });
      setLoading(false);
    } else {
      setSearchData(null);
    }
  }, [query]);

  if (loading) return <div className="loading-text">데이터를 불러오는 중입니다...</div>;
  if (!searchData) return <div className="no-query-text">검색어를 입력해주세요.</div>;

  const { totalResults, categories } = searchData;

  // 탭 변경 핸들러
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // 탭을 이동하면 스크롤을 맨 위로 올려주는 것이 UX상 좋습니다.
    window.scrollTo(0, 0); 
  };

  return (
    <div className="gs-search-page-container">
      {/* [왼쪽] 사이드바: 전체/공지사항 제거 및 클릭 이벤트 추가 */}
      <aside className="gs-sidebar">
        <div className="gs-sidebar-header" onClick={() => setActiveTab('all')} style={{cursor: 'pointer'}}>
          통합검색
          <span>&gt;</span>
        </div>
        <ul className="gs-sidebar-menu">
          {/* '전체'와 '공지사항'은 제거됨 */}
          
          <li 
            className={`gs-sidebar-item ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => handleTabClick('book')}
          >
            도서정보 ({categories.book.count})
          </li>
          
          <li 
            className={`gs-sidebar-item ${activeTab === 'challenge' ? 'active' : ''}`}
            onClick={() => handleTabClick('challenge')}
          >
            챌린지 ({categories.challenge.count})
          </li>
          
          <li 
            className={`gs-sidebar-item ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => handleTabClick('community')}
          >
            커뮤니티 ({categories.community.count})
          </li>
        </ul>
      </aside>

      {/* [오른쪽] 메인 콘텐츠 */}
      <main className="gs-main-content">
        
        {/* 상단 문구는 항상 표시 */}
        <div className="gs-search-header-area">
          <h2 className="gs-search-summary-text">
            검색어 <span className="gs-highlight-red">{query}</span>에 대한 
            총 <span className="gs-highlight-red">{totalResults}</span>건을 찾았습니다.
          </h2>
        </div>

        {/* 요약 대시보드: '전체' 보기(all) 상태일 때만 표시 */}
        {activeTab === 'all' && (
          <div className="gs-summary-dashboard">
            <div className="gs-summary-title">통합검색 요약</div>
            <div className="gs-summary-list">
               <div className="gs-summary-item">
                 • 도서정보 <span className="gs-summary-count">({categories.book.count})</span>
               </div>
               <div className="gs-summary-item">
                 • 챌린지 <span className="gs-summary-count">({categories.challenge.count})</span>
               </div>
               <div className="gs-summary-item">
                 • 커뮤니티 <span className="gs-summary-count">({categories.community.count})</span>
               </div>
            </div>
          </div>
        )}

        {/* 1. 도서정보 섹션 */}
        {/* activeTab이 'all' 이거나 'book' 일 때만 렌더링 */}
        {(activeTab === 'all' || activeTab === 'book') && (
          <section className="gs-category-section">
            <div className="gs-section-header">
              <h3 className="gs-section-title">도서정보</h3>
              <span className="gs-section-count">총 <span className="gs-total-count-red">{categories.book.count}</span>건</span>
            </div>
            
            {categories.book.count === 0 ? (
              <div className="gs-no-results-message">검색 결과가 없습니다.</div>
            ) : (
              <div className="gs-result-list">
                {/* 탭이 'book'으로 지정되어 있으면 slice 없이 전체 출력, 'all'이면 2개만 출력 */}
                {(activeTab === 'book' || expanded.book ? categories.book.results : categories.book.results.slice(0, 2)).map(book => (
                  <div key={book.id} className="gs-result-item" onClick={() => navigate(`/info-bookDetail?id=${book.id}`)} style={{cursor: 'pointer'}}>
                    <span className="gs-item-title">{book.title}</span>
                    <div className="gs-item-meta">{book.author} | {book.publisher}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 전체보기 모드('all')이고 개수가 많을 때만 더보기 버튼 노출 */}
            {activeTab === 'all' && categories.book.count > 2 && (
              <div className="gs-see-more-container">
                <button className="gs-see-more-btn" onClick={() => setExpanded(s => ({ ...s, book: !s.book }))}>
                  {expanded.book ? '접기' : '더보기 +'}
                </button>
              </div>
            )}
          </section>
        )}

        {/* 2. 챌린지 섹션 */}
        {(activeTab === 'all' || activeTab === 'challenge') && (
          <section className="gs-category-section">
            <div className="gs-section-header">
              <h3 className="gs-section-title">챌린지</h3>
              <span className="gs-section-count">총 <span className="gs-total-count-red">{categories.challenge.count}</span>건</span>
            </div>

            {categories.challenge.count === 0 ? (
              <div className="gs-no-results-message">검색 결과가 없습니다.</div>
            ) : (
              <div className="gs-result-list">
                {(activeTab === 'challenge' || expanded.challenge ? categories.challenge.results : categories.challenge.results.slice(0, 2)).map(ch => (
                  <div key={ch.id} className="gs-result-item">
                    <span className="gs-item-title">{ch.title}</span>
                    <div className="gs-item-desc">{ch.description}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'all' && categories.challenge.count > 2 && (
              <div className="gs-see-more-container">
                <button className="gs-see-more-btn" onClick={() => setExpanded(s => ({ ...s, challenge: !s.challenge }))}>
                  {expanded.challenge ? '접기' : '더보기 +'}
                </button>
              </div>
            )}
          </section>
        )}

        {/* 3. 커뮤니티 섹션 */}
        {(activeTab === 'all' || activeTab === 'community') && (
          <section className="gs-category-section">
            <div className="gs-section-header">
              <h3 className="gs-section-title">커뮤니티</h3>
               <span className="gs-section-count">총 <span className="gs-total-count-red">{categories.community.count}</span>건</span>
            </div>

            {categories.community.count === 0 ? (
               <div className="gs-no-results-message">검색 결과가 없습니다.</div>
            ) : (
              <div className="gs-result-list">
                {(activeTab === 'community' || expanded.community ? categories.community.results : categories.community.results.slice(0, 2)).map(post => (
                  <div key={post.id} className="gs-result-item">
                    <span className="gs-item-title">{post.title}</span>
                    <div className="gs-item-desc">{post.description}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'all' && categories.community.count > 2 && (
              <div className="gs-see-more-container">
                <button className="gs-see-more-btn" onClick={() => setExpanded(s => ({ ...s, community: !s.community }))}>
                  {expanded.community ? '접기' : '더보기 +'}
                </button>
              </div>
            )}
          </section>
        )}

      </main>
    </div>
  );
};

export default GlobalSearch;