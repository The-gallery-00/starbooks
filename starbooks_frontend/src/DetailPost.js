import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailPost.css";

export const samplePosts = [
  {
    id: 1,
    type: "투표",
    title: "1984 테스트: 빅 브라더는 무엇을 상징하는가?",
    relatedBook: "1984",
    content: "빅 브라더가 상징하는 것은 무엇일까요? 독재 정권? 감시 시스템? 아니면 현대인의 익명성?",
    date: "2025/11/01",
    author: "STARBOOKS 운영팀",
    options: [
      { text: "독재 정권", count: 2 },
      { text: "감시 시스템", count: 1 },
      { text: "현대인의 익명성", count: 3 },
    ],
    comments: [
      { id: 1, author: "user1", content: "좋은 질문이네요!", date: "2025/11/02 14:30" },
    ]
  },
  {
    id: 2,
    type: "토론",
    title: "AI가 창작한 소설, 문학으로 인정할 수 있을까?",
    relatedBook: "문학과 기술",
    content: "AI 창작물을 문학으로 인정할 수 있다고 생각하시나요?",
    date: "2025/11/05",
    author: "readerMaster",
    comments: []
  },
  {
    id: 3,
    type: "투표",
    title: "책 읽는 시간, 언제가 가장 좋나요?",
    relatedBook: "",
    content: "독서하기 가장 좋은 시간대는 언제인지 투표해주세요!",
    date: "2025/11/07",
    author: "STARBOOKS",
    options: [
      { text: "아침", count: 2 },
      { text: "점심", count: 1 },
      { text: "저녁", count: 3 },
      { text: "밤", count: 0 }
    ],
    comments: []
  }
];

export default function DetailPost() {
    const navigate = useNavigate();
    // const post = samplePosts.find(p => p.id === postId) || samplePosts[0];
    const { postId } = useParams();
    const numericId = parseInt(postId);
    

  const post = samplePosts.find(p => p.id === numericId) || samplePosts[0];
    const [comments, setComments] = useState(
        [...post.comments].reverse() // 최신 순 정렬
    );
    const [newComment, setNewComment] = useState("");
    const [isWriting, setIsWriting] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState(post.options || []);

    const handleAddComment = () => {
        if (newComment.trim() === "") return;

        const now = new Date();
        const formattedDate = now
        .toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
        })
        .replace(/\./g, "/")
        .replace(" ", "");

        const newItem = {
        id: comments.length + 1,
        author: "현재유저",
        content: newComment,
        date: formattedDate,
        };

        setComments([newItem, ...comments]); // 최신 댓글 위로
        setNewComment("");
        setIsWriting(false);
    };
    const handleVote = (index) => {
      // 이미 선택한 옵션을 다시 클릭 → 선택 취소
      if (selectedOption === index) {
        setSelectedOption(null);
        setOptions(prev =>
          prev.map((opt, i) =>
            i === index ? { ...opt, count: opt.count - 1 } : opt
          )
        );
        return;
      }

      // 다른 옵션을 새로 클릭 → 선택 변경
      if (selectedOption !== null) {
        // 기존 선택 해제
        setOptions(prev =>
          prev.map((opt, i) =>
            i === selectedOption ? { ...opt, count: opt.count - 1 } : opt
          )
        );
      }

      // 새로운 옵션 선택
      setSelectedOption(index);
      setOptions(prev =>
        prev.map((opt, i) =>
          i === index ? { ...opt, count: opt.count + 1 } : opt
        )
      );
    };

  
    const [currentPage, setCurrentPage] = useState(1);
    const COMMENTS_PER_PAGE = 10;

    const indexOfLast = currentPage * COMMENTS_PER_PAGE;
    const indexOfFirst = indexOfLast - COMMENTS_PER_PAGE;
    const currentComments = comments.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);


  return (
    <div className="detail-container">
      {/* 헤더 */}
      <div className="detail-header">
        <h2>커뮤니티 상세</h2>
        <button className="back-button" onClick={() => navigate(-1)}>
          목록으로
        </button>
      </div>

      {/* 카드 (제목·관련도서·메타만 포함) */}
      <div className="post-card-detail">
        <div
          className="post-type"
          style={{ backgroundColor: "#1D546C" }}
        >
          {post.type}
        </div>
        <h3 className="detail-post-title">{post.title}</h3>

        {post.relatedBook && (
          <p className="dp-post-related-book">
            <span>관련 도서:</span> {post.relatedBook}
          </p>
        )}

        <div className="post-meta">
          {post.author} | {post.date}
        </div>

      </div>

      {/* 본문(카드 아래로 분리) */}
      <div className="post-content-area">
        <p className="post-content">{post.content}</p>

        {/* 투표 선택지 */}
        {post.type === "투표" && (
          options.length > 0 ? (
            options.map((opt, idx) => (
              <div
                key={idx}
                className={`vote-option ${selectedOption === idx ? "selected" : ""}`}
                onClick={() => handleVote(idx)}
              >
                <span>{opt.text}</span>
                <span>{opt.count}명</span>
              </div>
            ))
          ) : (
            <div className="vote-empty">투표 항목이 없습니다.</div>
          )
        )}

      </div>

      {/* 댓글 */}
      <div className="comments-section">
        <div className="comments-header">
          <span>댓글 {comments.length}개</span>
          {!isWriting && (
            <button
              className="write-comment-btn"
              onClick={() => setIsWriting(true)}
            >
              댓글 작성
            </button>
          )}
        </div>

        {/* 댓글 입력창 */}
        {isWriting && (
          <div className="comment-write-box">
            <textarea
              className="comment-input"
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <div className="comment-write-buttons">
              <button
                className="cancel-comment-btn"
                onClick={() => {
                  setNewComment("");
                  setIsWriting(false);
                }}
              >
                취소
              </button>
              <button
                className="submit-comment-btn"
                onClick={handleAddComment}
              >
                완료
              </button>
            </div>
          </div>
        )}

        {/* 댓글 목록 */}
        <div className="comment-list">
          {currentComments.map((c) => (
            <div key={c.id} className="comment-item">
              <span className="comment-author">{c.author}</span>
              <span className="comment-date">{c.date}</span>
              <p className="comment-content">{c.content}</p>
            </div>
          ))}
        </div>

        {comments.length > COMMENTS_PER_PAGE && (
            <div className="pagination">
                <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className="page-btn"
                >
                ＜
                </button>

                {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
                >
                    {i + 1}
                </button>
                ))}

                <button
                onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                className="page-btn"
                >
                ＞
                </button>
            </div>
            )}

      </div>
    </div>
  );
}
