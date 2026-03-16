import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookDetail.css";
import dummy from "./dummy.png";
import MyRecords from "./MyRecords";

const dummyReviews = [
  { id: 1, username: "user1", text: "정말 재밌게 읽었습니다!", rating: 4.5, date: "2025/11/24", profile: "https://i.pravatar.cc/40?img=1" },
  { id: 2, username: "user2", text: "조금 지루한 부분도 있었지만 몰입감 있었어요.", rating: 3.5, date: "2025/11/23", profile: "https://i.pravatar.cc/40?img=2" },
  { id: 3, username: "user3", text: "추천합니다!", rating: 5, date: "2025/11/22", profile: "https://i.pravatar.cc/40?img=3" },
  { id: 4, username: "user4", text: "표지가 예쁘고 내용도 알찹니다.", rating: 4, date: "2025/11/21", profile: "https://i.pravatar.cc/40?img=4" },
  { id: 5, username: "user5", text: "좀 더 쉽게 설명되었으면 좋겠어요.", rating: 3, date: "2025/11/20", profile: "https://i.pravatar.cc/40?img=5" },
  { id: 6, username: "user6", text: "이 책 덕분에 새로운 관점을 배웠습니다.", rating: 5, date: "2025/11/19", profile: "https://i.pravatar.cc/40?img=6" },
  { id: 7, username: "user7", text: "내용이 조금 길지만 읽을 가치 있어요.", rating: 4, date: "2025/11/18", profile: "https://i.pravatar.cc/40?img=7" },
  { id: 8, username: "user8", text: "재밌는 챕터와 유익한 정보가 많아요.", rating: 4.5, date: "2025/11/17", profile: "https://i.pravatar.cc/40?img=8" },
  { id: 9, username: "user9", text: "글이 어렵지만 참고할 만한 내용입니다.", rating: 3.5, date: "2025/11/16", profile: "https://i.pravatar.cc/40?img=9" },
  { id: 10, username: "user10", text: "정말 만족스럽습니다. 추천!", rating: 5, date: "2025/11/15", profile: "https://i.pravatar.cc/40?img=10" },
  { id: 11, username: "user11", text: "중간에 약간 지루한 부분이 있었어요.", rating: 3.5, date: "2025/11/14", profile: "https://i.pravatar.cc/40?img=11" },
  { id: 12, username: "user12", text: "책의 내용이 깊이 있어서 좋았습니다.", rating: 4.5, date: "2025/11/13", profile: "https://i.pravatar.cc/40?img=12" },
];

export default function MyBookDetail() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const dummyBook = {
    title: "더미 테스트 도서 제목",
    author: "홍길동",
    description: "이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.이것은 더미 데이터 기반의 도서 줄거리입니다. UI 테스트 목적으로 작성되었습니다.",
    cover: dummy,
    progress: "70",
    readingStatus: "reading", // reading / finished / wishlist
    publisher: "민음사",
    isbn: "9788937462740"

  };
  // MyBookDetail.js 내부
  const [myRecords, setMyRecords] = useState([
    {
      id: 1,
      bookTitle: dummyBook.title, // 현재 도서 제목
      review: "정말 재미있게 읽었습니다!",
      rating: 5,
      passage: "새는 알에서 나오려고 투쟁한다...",
      timestamp: "2025/11/12 16:00",
    },
    {
      id: 2,
      bookTitle: dummyBook.title,
      review: "내용이 조금 어렵지만 유익했습니다.",
      rating: 4,
      passage: "모든 일에는 이유가 있다...",
      timestamp: "2025/11/08 10:30",
    },
    {
      id: 3,
      bookTitle: "다른 책 제목", // 다른 도서 기록
      review: "이건 다른 책 기록",
      rating: 3,
      passage: "다른 구절...",
      timestamp: "2025/11/01 12:00",
    },
  ]);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 상태 초기화
  const [wished, setWished] = useState(false);
  const [readingStatus, setReadingStatus] = useState(dummyBook.readingStatus);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 리뷰 최신순 정렬
  const sortedReviews = [...dummyReviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const selectedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  const pagesPerGroup = 3;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // const [myRecords, setMyRecords] = useState([]);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [newRecord, setNewRecord] = useState("");
  

  const handleAddRecord = () => {
    if (newRecord.trim() === "") return;
    setMyRecords(prev => [...prev, { text: newRecord, date: new Date().toLocaleDateString() }]);
    setNewRecord("");
    setShowRecordForm(false);
  };

  const handleWish = () => setWished(!wished);

  const handleAddClick = () => {
    if (readingStatus === "none") setShowModal(true);
    else setReadingStatus("none");
  };

  const handleSelect = (type) => {
    setReadingStatus(type);
    setShowModal(false);
  };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [currentPage]);

  const handleGoUser = (username) => navigate(`/user/${username}`);

  const handleStatusChange = (status) => setReadingStatus(status);

  const [showStoreModal, setShowStoreModal] = useState(false);

  return (
    <div className="mbd-book-detail-info-container">
      <div className="mbd-book-card">
        <img src={dummyBook.cover} alt={dummyBook.title} className="mbd-book-cover" />
        <div className="mbd-book-info">
          <div className="mbd-title-line">
            <h2>{dummyBook.title}</h2>
            <button 
              className="mbd-buy-btn" 
              onClick={() => setShowStoreModal(true)}>
                구매하러 가기
            </button>
          </div>
          <p className="mbd-author">{dummyBook.author}</p>
          <p className="mbd-publisher">{dummyBook.publisher}</p>
          <p className={`mbd-description ${showMore ? "open" : ""}`}>
            {dummyBook.description}
          </p>
          {dummyBook.description.length > 120 && (
            <span className="mbd-toggle-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? "접기 ▲" : "더보기 ▼"}
            </span>
          )}
          <div className="mbd-buttons">
            <button className={wished ? "wished" : ""} onClick={handleWish}>
              {wished ? "찜함" : "찜하기"}
            </button>
            <button
              className={readingStatus !== "none" ? "reading" : ""}
              onClick={handleAddClick}
            >
              {readingStatus === "none" ? "추가" : "추가됨"}
            </button>
          </div>

          {showModal && (
            <div className="mbd-modal-backdrop">
              <div className="mbd-modal">
                <h4>추가할 도서 상태를 선택하세요</h4>
                <button onClick={() => handleSelect("reading")}>읽고 있는 도서로 추가</button>
                <button onClick={() => handleSelect("finished")}>읽은 도서로 추가</button>
                <button className="mbd-close-btn" onClick={() => setShowModal(false)}>취소</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 진행률 및 내 기록 */}
      <div className="mbd-progress-record-section">
        <h3>진행률</h3>
        <div className="mbd-progress-bar" data-progress={dummyBook.progress}>
          <div className="mbd-progress" style={{ width: `${dummyBook.progress}%` }}></div>
        </div>
        <p>{dummyBook.progress}% 완료</p>
        <MyRecords
          records={myRecords}
          setRecords={setMyRecords}
          progress={dummyBook.progress}
          bookTitle={dummyBook.title}
          navigate={navigate}
        />

      </div>

      {/* 사용자 도서평 */}
      <div className="mbd-user-reviews">
        <h3>사용자 도서평 <span className="review-count">{dummyReviews.length}</span></h3>
        {selectedReviews.map((r) => (
          <div className="mbd-review" key={r.id}>
            <img
              src={r.profile}
              alt={r.username}
              className="mbd-profile"
              onClick={() => handleGoUser(r.username)}
            />
            <div className="mbd-review-content">
              <div className="mbd-review-header">
                <p className="mbd-username" onClick={() => handleGoUser(r.username)}>{r.username}</p>
                <span className="mbd-rating">⭐️{r.rating}</span>
              </div>
              <p className="mbd-text">{r.text}</p>
              <p className="mbd-date">{r.date}</p>
            </div>
          </div>
        ))}

        {/* 페이지네이션 */}
        {dummyReviews.length > reviewsPerPage && (
          <div className="mbd-pagination">
            <button
              className="mbd-page-btn"
              onClick={() => startPage > 1 && setCurrentPage(startPage - pagesPerGroup)}
              disabled={startPage === 1}
            >
              ＜
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const pageNum = startPage + i;
              return (
                <button
                  key={pageNum}
                  className={`mbd-page-number ${currentPage === pageNum ? "active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="mbd-page-btn"
              onClick={() => endPage < totalPages && setCurrentPage(endPage + 1)}
              disabled={endPage === totalPages}
            >
              ＞
            </button>
          </div>
        )}
        {/* 구매처 선택 모달 */}
        {showStoreModal && (
          <div className="mbd-modal-backdrop">
            <div className="mbd-modal store-modal">
              <h4>원하는 서점을 선택하세요</h4>

              <button
                onClick={() => {
                  const query = encodeURIComponent(dummyBook.isbn || dummyBook.title);
                  window.open(`https://search.kyobobook.co.kr/search?keyword=${query}`, "_blank");
                  setShowStoreModal(false);
                }}
              >
                교보문고
              </button>

              <button
                onClick={() => {
                  const query = encodeURIComponent(dummyBook.isbn || dummyBook.title);
                  window.open(`https://www.yes24.com/Product/Search?query=${query}`, "_blank");
                  setShowStoreModal(false);
                }}
              >
                YES24
              </button>

              <button
                onClick={() => {
                  const query = encodeURIComponent(dummyBook.isbn || dummyBook.title);
                  window.open(`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=${query}`, "_blank");
                  setShowStoreModal(false);
                }}
              >
                알라딘
              </button>

              <button className="mbd-close-btn" onClick={() => setShowStoreModal(false)}>
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
