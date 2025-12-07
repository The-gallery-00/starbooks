import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./api/axiosInstance"; // axiosInstance 사용
import { UserContext } from "./UserContext";
import "./DetailPost.css";

export default function DetailPost() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { postId } = useParams();
  const numericId = parseInt(postId);

  const [post, setPost] = useState(null);
  const [options, setOptions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [postMenuOpen, setPostMenuOpen] = useState(false);

  const isMyPost = post?.userId === user?.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(`/api/community/posts/${numericId}`);
        const postData = postRes.data;

        setPost({
          ...postData,
          relatedBook: postData.bookTitle,
          date: new Date(postData.createdAt)
            .toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23",
            })
            .replace(/\./g, "/")
        });

        // ⭐ 여기에서 분기
        if (postData.postType === "POLL" || postData.postType === "QUIZ") {
          const optionRes = await axios.get(`/api/community/posts/${numericId}/options`);
          const raw = optionRes.data || [];

          setOptions(
            raw.map(opt => ({
              optionId: opt.optionId,
              text: opt.optionText,
              isAnswer: opt.isCorrect,
              count: opt.count || 0,
              order: opt.optionOrder
            }))
          );
        }

        const commentRes = await axios.get(`/api/community/posts/${numericId}/comments`);
        setComments(commentRes.data.reverse());

      } catch (err) {
        console.error("게시글 조회 실패:", err);
        alert("게시글을 불러오지 못했습니다.");
        navigate("/community");
      }
    };

    fetchData();
  }, [numericId, navigate]);


  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const res = await axios.post(
        `/api/community/posts/${numericId}/comments`,
        {
          userId: user.userId,
          content: newComment
        }
      );

      setComments(prev => [res.data, ...prev]);
      setNewComment("");
      setIsWriting(false);

    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };


  const handleVote = (index) => {
    if (!options || options.length === 0) return;

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

  if (!post) return <div>로딩중...</div>;

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
          <div className="dp-post-type" style={{ backgroundColor: "#A98A6A" }}>
            {post.postType === "DISCUSSION" ? "토론" 
            : post.postType === "QUIZ" ? "퀴즈" : "투표"}
          </div>
        </div>

        <h3 className="dp-detail-post-title">{post.title}</h3>
        {post.relatedBook && post.relatedBook.trim() !== "" && (
          <p className="dp-post-related-book">
            <span>관련 도서:</span> {post.relatedBook}
          </p>
        )}

        <div className="dp-post-meta">
          {post.date}
        </div>
      </div>

      <div className="dp-post-content-area">
        <p className="dp-post-content">{post.content}</p>

        {/* 투표 */}
        {post.postType === "POLL" &&
          options.map((opt, idx) => (
            <div
              key={opt.optionId}
              className={`dp-vote-option ${selectedOption === idx ? "selected" : ""}`}
              onClick={() => handleVote(idx)}
            >
              <span>{opt.text}</span>
              <span>{opt.count}명</span>
            </div>
          ))}

        {/* 퀴즈 */}
        {post.postType === "QUIZ" &&
          options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isAnswered = selectedOption !== null;

            let className = "dp-quiz-option";
            if (isAnswered) {
              if (isSelected) className += opt.isAnswer ? " correct" : " wrong";
              else if (opt.isAnswer) className += " show-answer";
            }

            return (
              <div key={opt.optionId}>
                <div
                  className={className}
                  onClick={() => !isAnswered && setSelectedOption(idx)}
                >
                  {idx + 1}. {opt.text}
                </div>
              </div>
            );
          })}
        {selectedOption !== null && post.postType === "QUIZ" && (
          <div
            className={`dp-quiz-message ${
              options[selectedOption]?.isAnswer ? "dp-correct-msg" : "dp-wrong-msg"
            }`}
          >
            {options[selectedOption]?.isAnswer
              ? "정답입니다!"
              : `정답이 아닙니다. 정답은 ${options.findIndex(o => o.isAnswer) + 1}번입니다.`}
          </div>
        )}
      </div>

      {/* 댓글 */}
      <div className="comments-section">
        <div className="comments-header">
          <span>댓글 {comments.length}개</span>
          {!isWriting && (
            <button className="write-comment-btn" onClick={() => setIsWriting(true)}>
              댓글 작성
            </button>
          )}
        </div>

        {isWriting && (
          <div className="comment-write-box">
            <textarea
              className="comment-input"
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="comment-write-buttons">
              <button className="cancel-comment-btn" onClick={() => { setNewComment(""); setIsWriting(false); }}>취소</button>
              <button className="submit-comment-btn" onClick={handleAddComment}>완료</button>
            </div>
          </div>
        )}

        <div className="comment-list">
          {comments.map(c => (
            <div key={c.id} className="comment-item">
              <span className="comment-author">{c.userName}</span>
              <span className="comment-date">
                {new Date(c.createdAt).toLocaleString("ko-KR")}
              </span>
              <p className="comment-content">{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
