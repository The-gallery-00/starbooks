import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MyBookDetail.css";
import MyRecords from "./MyRecords";
import { myBooks } from "./MyLibrary";
import defaultImage from "./profile.jpg"

const dummyReviews = [
  { id: 1, bookId: 11, username: "책책책을읽읍시다", text: "감정을 배우는 소년의 성장 이야기가 마음을 울린다.", rating: 4, date: "2025/11/24", profile: defaultImage },
  { id: 2, bookId: 11, username: "책헌터", text: "삶과 인간관계에 대해 깊이 생각하게 만드는 작품.", rating: 5, date: "2025/11/23", profile: defaultImage },
  { id: 3, bookId: 11, username: "페이지터너", text: "“감정은 한 번에 폭발하지 않아도, 작은 변화가 쌓이면 큰 울림이 된다.”", rating: 4, date: "2025/11/22", profile: defaultImage },
];

const myBooksAll = [...myBooks.reading, ...myBooks.finished, ...myBooks.wishlist];

export default function MyBookDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = myBooksAll.find(b => b.id == id);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const [myRecords, setMyRecords] = useState([]);
  const [wished, setWished] = useState(false);
  const [readingStatus, setReadingStatus] = useState(book?.progress ? "reading" : "none");
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [newRecord, setNewRecord] = useState("");

  const [totalBookPages, setTotalBookPages] = useState(book?.allPages || 0);
  const [currentBookPage, setCurrentBookPage] = useState(
    book?.progress ? Math.round((parseInt(book.progress.replace("%", "")) / 100) * (book.allPages || 0)) : 0
  );

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [tempTotalPages, setTempTotalPages] = useState(totalBookPages);
  const [tempCurrentPage, setTempCurrentPage] = useState(currentBookPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!book) return <p>도서 정보가 없습니다.</p>;

  const bookReviews = dummyReviews.filter(r => r.bookId === book.id);
  const sortedReviews = [...bookReviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const selectedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  const pagesPerGroup = 3;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handleAddRecord = () => {
    if (!newRecord.trim()) return;
    setMyRecords(prev => [...prev, { text: newRecord, date: new Date().toLocaleDateString() }]);
    setNewRecord("");
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

  // const handleGoUser = (id) => {
  //   navigate(`/friend/${id}`);
  // };
  const handleStatusChange = (status) => setReadingStatus(status);

  const progressPercentage = Math.round((currentBookPage / totalBookPages) * 100);
  
  return (
    <div className="mbd-book-detail-info-container">
      {/* 도서 카드 */}
      <div className="mbd-book-card">
        <img src={book.cover} alt={book.title} className="mbd-book-cover" />
        <div className="mbd-book-info">
          <div className="mbd-title-line">
            <h2>{book.title}</h2>
            <button className="mbd-buy-btn" onClick={() => setShowStoreModal(true)}>
              구매하러 가기
            </button>
          </div>
          <p className="mbd-author">{book.author}</p>
          <p className={`mbd-description ${showMore ? "open" : ""}`}>{book.description}</p>
          {book.description.length > 120 && (
            <span className="mbd-toggle-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? "접기 ▲" : "더보기 ▼"}
            </span>
          )}
          <div className="mbd-buttons">
            <button className={wished ? "wished" : ""} onClick={handleWish}>
              {wished ? "찜함" : "찜하기"}
            </button>
            <button className={readingStatus !== "none" ? "reading" : ""} onClick={handleAddClick}>
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

      {/* 진행률 */}
      <div className="mbd-progress-record-section">
        <h3>
          진행률
          <span style={{ marginLeft: "10px", fontSize: "14px", color: "#555" }}>
            {totalBookPages
              ? `${currentBookPage} / ${totalBookPages} 페이지 (${progressPercentage}% 완료)`
              : "아직 진행률이 설정되지 않았습니다. 진행률 설정으로 나의 도서 진행률을 확인해보세요!"
            }
          </span>
          <button 
            className="mbd-set-progress-btn" 
            onClick={() => {
              setTempTotalPages(totalBookPages);
              setTempCurrentPage(currentBookPage);
              setShowProgressModal(true);
            }}
          >
            진행률 설정하기
          </button>
        </h3>

        <div className="mbd-progress-bar">
          <div 
            className="mbd-progress" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <MyRecords
          records={myRecords}
          setRecords={setMyRecords}
          progress={progressPercentage}
          bookTitle={book.title}
          navigate={navigate}
        />
      </div>
      {/* 진행률 설정 모달 */}
      {showProgressModal && (
        <div className="mbd-modal-backdrop">
          <div className="mbd-modal progress-modal">
            <h3>도서 진행률 설정</h3>
            
            <div className="mbd-page-input">
              <p>전체 페이지</p>
              <input
                type="number"
                value={tempTotalPages}
                onChange={e => {
                  const newTotal = Number(e.target.value);
                  setTempTotalPages(newTotal);
                  setTempCurrentPage(0); // 전체 페이지 변경 시 현재 페이지 0으로 초기화
                }}
                min="0"
              />
            </div>
            
            <div className="mbd-page-input">
              <p>현재 페이지</p>
              <input
                type="number"
                value={tempCurrentPage}
                onChange={e => {
                  const val = Number(e.target.value);
                  setTempCurrentPage(Math.max(0, Math.min(val, tempTotalPages)));
                }}
                min="0"
                max={tempTotalPages}
              />
            </div>
            
            <div className="mbd-modal-buttons">
              <button
                className="mbd-btn-cancel"
                onClick={() => {
                  setTempTotalPages(totalBookPages);
                  setTempCurrentPage(currentBookPage);
                  setShowProgressModal(false);
                }}
              >
                취소
              </button>
              <button
                className="mbd-btn-save"
                onClick={() => {
                  const total = Number(tempTotalPages) || 0; // NaN 방지
                  // 전체 페이지가 0이거나 현재 페이지가 전체 페이지보다 크면 0으로 초기화
                  const current = total === 0 || tempCurrentPage > total ? 0 : Number(tempCurrentPage) || 0;

                  setTotalBookPages(total);
                  setCurrentBookPage(current);
                  setShowProgressModal(false);
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 사용자 도서평 */}
      <div className="mbd-user-reviews">
        <h3>사용자 도서평 <span className="review-count">{bookReviews.length}</span></h3>
        {selectedReviews.map(r => (
          <div className="mbd-review" key={r.id}>
            <img
              src={r.profile}
              alt={r.username}
              className="mbd-profile"
              // onClick={() => handleGoUser(r.username)}
            />
            <div className="mbd-review-content">
              <div className="mbd-review-header">
                <p 
                  className="mbd-username" 
                  // onClick={() => handleGoUser(r.username)}
                >
                  {r.username}
                </p>
                <span className="mbd-rating">⭐️{r.rating}</span>
              </div>
              <p className="mbd-text">{r.text}</p>
              <p className="mbd-date">{r.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
        {bookReviews.length > reviewsPerPage && (
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
            <button onClick={() => window.open(`https://search.kyobobook.co.kr/search?keyword=${book.title}`, "_blank")}>교보문고</button>
            <button onClick={() => window.open(`https://www.yes24.com/Product/Search?query=${book.title}`, "_blank")}>YES24</button>
            <button onClick={() => window.open(`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=${book.title}`, "_blank")}>알라딘</button>
            <button className="mbd-close-btn" onClick={() => setShowStoreModal(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
