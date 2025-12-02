import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./InfoBookDetail.css";
import dummy from "./dummy.png";

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
  { id: 13, username: "user13", text: "간결하고 이해하기 쉬워요.", rating: 4, date: "2025/11/12", profile: "https://i.pravatar.cc/40?img=13" },
  { id: 14, username: "user14", text: "책을 읽고 나서 많은 걸 배웠습니다.", rating: 5, date: "2025/11/11", profile: "https://i.pravatar.cc/40?img=14" },
  { id: 15, username: "user15", text: "추천할 만한 책이에요. 다시 읽고 싶습니다.", rating: 4.5, date: "2025/11/10", profile: "https://i.pravatar.cc/40?img=15" },
  { id: 16, username: "user16", text: "조금 아쉬운 점이 있지만 전반적으로 만족합니다.", rating: 4, date: "2025/11/09", profile: "https://i.pravatar.cc/40?img=16" },
  { id: 17, username: "user17", text: "읽는 내내 흥미진진했어요.", rating: 5, date: "2025/11/08", profile: "https://i.pravatar.cc/40?img=17" },
  { id: 18, username: "user18", text: "더 다양한 예시가 있었으면 좋겠어요.", rating: 3.5, date: "2025/11/07", profile: "https://i.pravatar.cc/40?img=18" },
  { id: 19, username: "user19", text: "작가의 의도가 잘 전달되는 책입니다.", rating: 4.5, date: "2025/11/06", profile: "https://i.pravatar.cc/40?img=19" },
  { id: 20, username: "user20", text: "짧지만 핵심을 잘 담았네요.", rating: 4, date: "2025/11/05", profile: "https://i.pravatar.cc/40?img=20" },
];

export default function InfoBookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {
    book: {
      title: "테스트 도서",
      author: "홍길동",
      description: "테스트용 줄거리입니다. 여러 문장이 들어갈 수 있습니다.",
      cover: dummy,
      isWished: false,
      readingStatus: "none",
      isbn: "9788937462740"
    },
  };

  const [showMore, setShowMore] = useState(false);
  const [wished, setWished] = useState(book.isWished);
  const [readingStatus, setReadingStatus] = useState(book.readingStatus);
  const [showModal, setShowModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const handleWish = () => setWished(!wished);
  const handleGoUser = (username) => navigate(`/user/${username}`);

  const handleAddClick = () => {
    if (readingStatus === "none") setShowModal(true);
    else setReadingStatus("none");
  };

  const handleSelect = (type) => {
    setReadingStatus(type);
    setShowModal(false);
  };

  // 최신순 정렬
  const sortedReviews = [...dummyReviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const selectedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  // 페이지 그룹
  const pagesPerGroup = 3;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // 페이지 변경 시 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="ibd-book-detail-info-container">
      <div className="ibd-book-card">
        <img src={book.cover} alt={book.title} className="ibd-book-cover" />
        <div className="ibd-book-info">
          <div className="ibd-title-line">
            <h2>{book.title}</h2>
            <button className="ibd-buy-btn" onClick={() => setShowStoreModal(true)}>구매하러 가기</button>
          </div>
          <p className="ibd-author">{book.author}</p>
          <p className="ibd-publisher">{book.publisher}</p>
          <p className={`ibd-description ${showMore ? "open" : ""}`}>
            {book.description}
          </p>
          {book.description.length > 120 && (
            <span className="ibd-toggle-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? "접기 ▲" : "더보기 ▼"}
            </span>
          )}
          <div className="ibd-buttons">
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
            <div className="ibd-modal-backdrop">
              <div className="ibd-modal">
                <h4>추가할 도서 상태를 선택하세요</h4>
                <button onClick={() => handleSelect("reading")}>읽고 있는 도서로 추가</button>
                <button onClick={() => handleSelect("finished")}>읽은 도서로 추가</button>
                <button className="ibd-close-btn" onClick={() => setShowModal(false)}>취소</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 사용자 도서평 */}
      <div className="ibd-user-reviews">
        <h3>
          사용자 도서평 <span className="review-count">{dummyReviews.length}</span>
        </h3>
        {selectedReviews.map((r) => (
          <div className="ibd-review" key={r.id}>
            <img
              src={r.profile}
              alt={r.username}
              className="ibd-profile"
              onClick={() => handleGoUser(r.username)}
            />
            <div className="ibd-review-content">
              <div className="ibd-review-header">
                <p className="ibd-username" onClick={() => handleGoUser(r.username)}>
                  {r.username}
                </p>
                <span className="ibd-rating">⭐️{r.rating}</span>
              </div>
              <p className="ibd-text">{r.text}</p>
              <p className="ibd-date">{r.date}</p>
            </div>
          </div>
        ))}

        {/* 페이지네이션 */}
        {dummyReviews.length > reviewsPerPage && (
          <div className="ibd-pagination">
            <button
              className="ibd-page-btn"
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
                  className={`ibd-page-number ${currentPage === pageNum ? "active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="ibd-page-btn"
              onClick={() => endPage < totalPages && setCurrentPage(endPage + 1)}
              disabled={endPage === totalPages}
            >
              ＞
            </button>
          </div>
        )}
        {/* 구매하러가기 */}
        {/* 구매처 선택 모달 */}
        {showStoreModal && (
          <div className="mbd-modal-backdrop">
            <div className="mbd-modal store-modal">
              <h4>구매처를 선택하세요</h4>

              <button
                onClick={() => {
                  const query = encodeURIComponent(book.isbn || book.title);
                  window.open(`https://search.kyobobook.co.kr/search?keyword=${query}`, "_blank");
                  setShowStoreModal(false);
                }}
              >
                교보문고
              </button>

              <button
                onClick={() => {
                  const query = encodeURIComponent(book.isbn || book.title);
                  window.open(`https://www.yes24.com/Product/Search?query=${query}`, "_blank");
                  setShowStoreModal(false);
                }}
              >
                YES24
              </button>

              <button
                onClick={() => {
                  const query = encodeURIComponent(book.isbn || book.title);
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
