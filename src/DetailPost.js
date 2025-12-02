import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import "./DetailPost.css";

export const samplePosts = [
  {
    id: 1,
    type: "퀴즈",
    title: "다음 중 1984 소설에서 ‘빅 브라더’를 상징하는 것은?",
    relatedBook: "1984",
    content: "1984 소설과 관련된 퀴즈입니다. 정답을 선택하세요.",
    date: "2025/11/07",
    author: "STARBOOKS",
    options: [
      { text: "자유와 평등", isAnswer: false },
      { text: "독재 정권", isAnswer: true },
      { text: "친절한 지도자", isAnswer: false },
      { text: "감시 시스템", isAnswer: false },
      { text: "현대인의 익명성", isAnswer: false },
    ],
    comments: []
    
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
    comments: []
    
  }
];

export default function DetailPost() {
    const navigate = useNavigate();

    const { postId, postType } = useParams();
    const numericId = parseInt(postId);
    
    const post = samplePosts.find(
      p => p.id === numericId && p.type === postType
    ) || samplePosts[0];
    const [comments, setComments] = useState(
        [...post.comments].reverse()
    );
    const [newComment, setNewComment] = useState("");
    const [isWriting, setIsWriting] = useState(false);

    const [postMenuOpen, setPostMenuOpen] = useState(false);
    const isMyPost = post.author === "현재유저";


    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState(post.options || []);

    const [dropdownOpenId, setDropdownOpenId] = useState(null);

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

        setComments([newItem, ...comments]);
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

    const handleDeleteComment = (id) => {
      setComments(prev => prev.filter(c => c.id !== id));
      setDropdownOpenId(null);
    };

  return (
    <div className="dp-detail-container">
      <div className="dp-detail-header">
        <h2>커뮤니티 상세</h2>
        <button className="dp-back-button" onClick={() => navigate(-1)}>
          목록으로
        </button>
      </div>

      <div className="dp-post-card-detail">
  <div className="dp-post-header-row">
    <div
      className="dp-post-type"
      style={{ backgroundColor: "#A98A6A" }}
    >
      {post.type}
    </div>

    {/* 자신이 작성한 글일 때만 옵션 버튼 표시 */}
    {isMyPost && (
      <div className="dp-post-menu-container">
        <IoEllipsisVertical
          className="dp-post-menu-icon"
          onClick={() => setPostMenuOpen((prev) => !prev)}
        />

        {postMenuOpen && (
          <div className="dp-post-dropdown">
            <button
              className="dp-post-dropdown-item"
              onClick={() => navigate(-1)}
            >
              글 삭제
            </button>
          </div>
        )}
      </div>
    )}
  </div>

  <h3 className="dp-detail-post-title">{post.title}</h3>

  {post.relatedBook && post.relatedBook.trim() !== "" && (
    <p className="dp-post-related-book">
      <span>관련 도서:</span> {post.relatedBook}
    </p>
  )}

  <div className="dp-post-meta">
    {post.author} | {post.date}
  </div>
</div>


      <div className="dp-post-content-area">
        <p className="dp-post-content">{post.content}</p>

        {/* 투표 */}
        {post.type === "투표" && (
          options.length > 0 ? (
            options.map((opt, idx) => (
              <div
                key={idx}
                className={`dp-vote-option ${selectedOption === idx ? "selected" : ""}`}
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

        {/* 퀴즈 */}
        {post.type === "퀴즈" && options.length > 0 && (
          <>
            {
              options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isAnswerSelected = selectedOption !== null; // 이미 선택했는지 여부
                let className = "dp-quiz-option";

                if (isAnswerSelected) {
                  if (isSelected) {
                    className += opt.isAnswer ? " correct" : " wrong"; // 선택한 항목 표시
                  } else if (opt.isAnswer) {
                    className += " show-answer"; // 선택 후 정답은 항상 표시
                  }
                }

                return (
                  <div key={idx}>
                    <div
                      className={className}
                      onClick={() => !isAnswerSelected && setSelectedOption(idx)} // 선택 전만 클릭 가능
                    >
                      {idx + 1}. {opt.text}
                    </div>                
                  </div>
                );          
              })}

              {/* 선택 후 메시지 */}
              {selectedOption !== null && (
                <div
                  className={`dp-quiz-message ${
                    options[selectedOption].isAnswer ? "dp-correct-msg" : "dp-wrong-msg"
                  }`}
                >
                  {options[selectedOption].isAnswer
                    ? "정답입니다!"
                    : `정답이 아닙니다. 정답은 ${options.findIndex(o => o.isAnswer) + 1}번입니다.`}
                </div>
              )}

          
          </>
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
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <span className="comment-author">{c.author}</span>
              <span className="comment-date">{c.date}</span>
              <p className="comment-content">{c.content}</p>

              {c.author === "현재유저" && (
                <div className="comment-dropdown-container">
                  <IoEllipsisVertical
                    className="dp-dropdown-icon"
                    onClick={() => setDropdownOpenId(dropdownOpenId === c.id ? null : c.id)}
                  />
                  {dropdownOpenId === c.id && (
                    <div className="dp-dropdown-menu">
                      <button className="dp-dropdown-item" onClick={() => handleDeleteComment(c.id)}>댓글 삭제</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
