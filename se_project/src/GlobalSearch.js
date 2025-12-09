import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GlobalSearch.css';

const mockSearchApi = (query) => {
  const books = [
    {
      id: 1,
      title: "소년이 온다",
      author: "한강",
      publisher: "창비",
      image: "https://image.aladin.co.kr/product/4086/97/cover/8936434128_2.jpg",
      description: "섬세한 감수성과 치밀한 문장으로 인간 존재의 본질을 탐구해온 작가 한강의 여섯번째 장편소설. '상처의 구조에 대한 투시와 천착의 서사'를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명한다.",
    },
    {
      id: 2,
      title: "데미안",
      author: "헤르만 헤세",
      publisher: "민음사",
      image: "https://bookthumb-phinf.pstatic.net/cover/000/051/00005186.jpg?type=m1&udate=20160509",
      description: "2차 세계대전 중 많은 독일 젊은이들이 전장에 나가면서 군복 주머니 속에 품고 갔던 책. 어른이 되기 위해 보이지 않는 껍질을 깨고 고통스런 현실의 세계로 나서는 젊은이들을 그렸다. 지금까지도 젊은이들에게 '통과의례'처럼 읽히고 있는 명작을 새로 옮겼다.",
    },
    {
      id: 11,
      title: "아몬드",
      author: "손원평",
      publisher: "창비",
      image: "https://image.yes24.com/goods/37300128/XL",
      description: "제10회 창비청소년문학상 수상작. ‘감정을 느끼지 못하는’ 소년의 특별한 성장 이야기로, 첫 장부터 강렬한 사건으로 시작해 다음 페이지가 궁금해지게 만드는 흡입력 강한 작품이다. 타인의 감정에 무감각해진 ‘공감 불능’인 이 시대에 큰 울림을 준다.",
    },
    {
      id: 12,
      title: "나미야 잡화점의 기적",
      author: "히가시노 게이고",
      publisher: "현대문학",
      image: "https://image.aladin.co.kr/product/15848/6/cover/k622533431_1.jpg",
      description: "2012년 12월 19일 국내 번역 출간된 이래 6년 연속 베스트셀러 순위 상위권을 차지하며 서점가에서 21세기 가장 경이로운 베스트셀러라고 불리는 소설. '2008~2017년, 지난 10년간 한국에서 가장 많이 팔린 소설', 히가시노 게이고의 대표작 <나미야 잡화점의 기적>이 국내 누적 판매 100만 부를 돌파했다.",
    },
    {
      id: 13,
      title: "대온실 수리 보고서",
      author: "김금희",
      publisher: "창비",
      image: "https://image.aladin.co.kr/product/34712/24/cover200/8936439650_2.jpg",
      description: "창경궁 대온실을 둘러싼 가슴 저릿한 역사와 미완으로 남은 인간의 소망을 재건하는 아름다운 시도 마침내 탄생한 김금희의 역작!이야기의 아름다움을 증명해온 소설가 김금희가 장편소설 『대온실 수리 보고서』를 선보인다. 살아남은 역사의 잔재인 창경궁 대온실을 배경으로 한 가슴 아픈 역사와 인간에 대한 믿음을 저버리지 않으려는 신념을 감동적으로 보여주는 작품으로, 김금희 소설세계를 한차원 새롭게 열며 근래 보기 드문 풍성한 장편소설의 진면목을 보여주는 대작이다. 30대 여성 ‘영두’가 창경궁 대온실 보수공사의 백서를 기록하는 일을 맡게 되면서 이야기는 시작된다. 영두는 석모도 출신으로, 중학생 때 창덕궁 담장을 따라 형성된 서울의 동네인 원서동에서 유학을 한 경험이 있다. 어떤 이유 때문인지 ‘창경궁’이라는 말을 듣고는 마음이 서늘해지는 것을 느끼며 처음엔 백서를 기록하는 일을 맡기를 꺼린다. 그곳에서 아주 크게 인생이 꺾이는 일이 있었다는 듯이.",
    },
    {
      id: 14,
      title: "불편한 편의점",
      author: "김호연",
      publisher: "나무옆의자",
      image: "https://image.aladin.co.kr/product/26942/84/cover/k582730818_1.jpg",
      description: "<망원동 브라더스>의 작가 김호연의 '동네이야기' 시즌 2. 청파동 골목 모퉁이에 자리 잡은 작은 편의점을 무대로 힘겨운 시대를 살아가는 우리 이웃들의 삶의 속내와 희로애락을 따뜻하고 유머러스하게 담아냈다.",
    },
    {
      id: 21,
      title: "절창",
      author: "구병모",
      publisher: "문학동네",
      image: "https://image.aladin.co.kr/product/37172/36/cover200/k662031678_1.jpg",
      description: "더이상의 수식이 필요치 않은 작가, 그 이름이 하나의 브랜드가 된 구병모의 장편소설 『절창』이 문학동네에서 출간되었다. 제목인 ‘절창切創’은 ‘베인 상처’라는 뜻으로, 상처에 접촉하는 것으로 상대의 마음을 읽는 한 여성의 이야기를 담고 있다.",
    },
  ];

  const challenges = [
    { id: 201, title: '100일 독서 챌린지', description: '매일 최소 10쪽씩 읽고 인증하기' },
    { id: 202, title: '한달에 5권 읽기', description: '월간 독서 목표 달성 프로젝트' },
    { id: 203, title: '하루 1장 쓰기 챌린지', description: '글쓰기 근육을 기르는 매일 리뷰' },
  ];

  const community = [
    { id: 301, title: '아몬드:윤재의 감정 변화', description: '여러분은 윤재가 진짜 감정을 느낀 것이라고 보시나요, 아니면 단지 이해하려 노력한 것이라고 생각하시나요?' },
    { id: 302, title: '다음 중 1984 소설에서 ‘빅 브라더’를 상징하는 것은?', description: '1984 소설과 관련된 퀴즈입니다. 정답을 선택하세요.' },
    { id: 303, title: '내가 만약 모비딕이라면: 에이허브 선장을 피할까?', description: '나를 쫓는 모비딕을 끝까지 쫓아갈까 vs 모비딕보다 다른 행복을 쫓는다? 당신의 선택은?' },
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
  
  const [activeTab, setActiveTab] = useState('all');

  const [expanded, setExpanded] = useState({ book: false, challenge: false, community: false });

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0); 
  };

  const goToDetail = (book) => {
    navigate(`/info-bookDetail/${book.isbn}`, { state: { book } });
  };

  return (
    <div className="gs-search-page-container">
      <aside className="gs-sidebar">
        <div className="gs-sidebar-header" onClick={() => setActiveTab('all')} style={{cursor: 'pointer'}}>
          통합검색
          <span>&gt;</span>
        </div>
        <ul className="gs-sidebar-menu">
          
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

      <main className="gs-main-content">
        
        <div className="gs-search-header-area">
          <h2 className="gs-search-summary-text">
            검색어 <span className="gs-highlight-red">{query}</span>에 대한 
            총 <span className="gs-highlight-red">{totalResults}</span>건을 찾았습니다.
          </h2>
        </div>

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
                {(activeTab === 'book' || expanded.book ? categories.book.results : categories.book.results.slice(0, 2)).map(book => (
                  <div key={book.id} className="gs-result-item" onClick={() => goToDetail(book)} style={{cursor: 'pointer'}}>
                    <span className="gs-item-title">{book.title}</span>
                    <div className="gs-item-meta">{book.author} | {book.publisher}</div>
                  </div>
                ))}
              </div>
            )}
            
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
