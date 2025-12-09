import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "./api/axiosInstance";
import { UserContext } from "./UserContext";
import "./InfoBookDetail.css";
import defaultImage from "./profile.jpg";

const dummyReviews = [
  { id: 1, username: "책책책을읽읍시다", text: "정말 재밌게 읽었습니다!", rating: 4.5, date: "2025/11/24", profile: defaultImage },
  { id: 2, username: "책헌터", text: "조금 지루한 부분도 있었지만 몰입감 있었어요.", rating: 3.5, date: "2025/11/23", profile: defaultImage },
  { id: 3, username: "페이지터너", text: "추천합니다!", rating: 5, date: "2025/11/22", profile: defaultImage },
  { id: 4, username: "북페이스", text: "표지가 예쁘고 내용도 알찹니다.", rating: 4, date: "2025/11/21", profile: defaultImage },
  { id: 5, username: "독서광", text: "좀 더 쉽게 설명되었으면 좋겠어요.", rating: 3, date: "2025/11/20", profile: defaultImage },
  { id: 6, username: "활자중독자", text: "이 책 덕분에 새로운 관점을 배웠습니다.", rating: 5, date: "2025/11/19", profile: defaultImage },
  { id: 7, username: "책의정석", text: "내용이 조금 길지만 읽을 가치 있어요.", rating: 4, date: "2025/11/18", profile: defaultImage },
  { id: 8, username: "종이행성", text: "재밌는 챕터와 유익한 정보가 많아요.", rating: 4.5, date: "2025/11/17", profile: defaultImage },
  { id: 9, username: "활자마니아", text: "글이 어렵지만 참고할 만한 내용입니다.", rating: 3.5, date: "2025/11/16", profile: defaultImage },
];

export default function InfoBookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isbn: paramIsbn } = useParams();
  const { user } = useContext(UserContext);

  const [book, setBook] = useState(location.state?.book || null); // state에서 먼저 가져오기
  const [loading, setLoading] = useState(!book);
  const [error, setError] = useState(null);

  const [showMore, setShowMore] = useState(false);
  const [wished, setWished] = useState(book?.isWished || false);
  const [readingStatus, setReadingStatus] = useState(book.readingStatus);
  const [showModal, setShowModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

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

  useEffect(() => {
    // location.state에 book이 없으면 API로 가져오기
    if (!book && paramIsbn) {
      const fetchBook = async () => {
        try {
          setLoading(true);
          const response = await api.get("/api/search/book/detail", {
            params: { isbn: paramIsbn },
          });
          setBook(response.data);
          setWished(response.data.isWished || false);
          setReadingStatus(response.data.readingStatus || "none");
        } catch (err) {
          console.error("도서 상세 조회 실패:", err);
          setError("도서를 불러올 수 없습니다.");
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [book, paramIsbn]);

  // 초기 찜 상태 확인
  useEffect(() => {
    if (book?.bookId && user?.userId) {
      const checkFavorite = async () => {
        try {
          const res = await api.get("/api/favorites/check", {
            params: { userId: user.userId, bookId: book.bookId },
          });
          setWished(res.data);
        } catch (err) {
          console.error("찜 상태 확인 실패:", err);
        }
      };
      checkFavorite();
    }
  }, [book, user]);


  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>도서 정보를 불러올 수 없습니다.</p>;

  
  // 찜하기 / 취소
  const handleWish = async () => {
    if (!user || !book) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const payload = {
        userId: user.userId,
        bookId: book.bookId,
        isbn: book.isbn,
      };

      if (!wished) {
        // 찜하기
        await api.post("/api/favorites", payload, {
          headers: { "Content-Type": "application/json" },
        });
        setWished(true);
      } else {
        // 찜 취소
        await api.delete("/api/favorites", {
          headers: { "Content-Type": "application/json" },
          data: payload, // DELETE 요청에서 body 전송
        });
        setWished(false);
      }
    } catch (err) {
      console.error("찜하기 오류:", err);
      alert("찜하기 처리 중 오류가 발생했습니다.");
    }
  };


  const handleGoUser = (userId) => {
    navigate(`/friend/${userId}`);
  };

  const handleAddClick = () => {
    if (readingStatus === "none") setShowModal(true);
    else setReadingStatus("none");
  };

  const handleSelect = (type) => {
    setReadingStatus(type);
    setShowModal(false);
  };

  return (
    <div className="ibd-book-detail-info-container">
      <div className="ibd-book-card">
        <img src={book.coverImage} alt={book.title} className="ibd-book-cover" />
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
          <div className="ibd-modal-backdrop">
            <div className="ibd-modal store-modal">
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

              <button className="ibd-close-btn" onClick={() => setShowStoreModal(false)}>
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
