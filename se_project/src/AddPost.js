import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";
import { UserContext } from "./UserContext";
import axios from "./api/axiosInstance";


export default function AddPost() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("퀴즈");

  const [quizData, setQuizData] = useState({
    title: "",
    relatedBook: "",
    choices: ["", ""],
    answer: ""
  });

  const [voteData, setVoteData] = useState({ title: "", choices: ["", ""] });
  const [discussionData, setDiscussionData] = useState({ title: "", content: "" });

  const handleCancel = () => navigate(-1);

  const handleAddChoice = () => {
    if (voteData.choices.length < 5) {
      setVoteData({ ...voteData, choices: [...voteData.choices, ""] });
    }
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...voteData.choices];
    newChoices[index] = value;
    setVoteData({ ...voteData, choices: newChoices });
  };

  const handleQuizChoiceChange = (index, value) => {
    const newChoices = [...quizData.choices];
    newChoices[index] = value;
    setQuizData({ ...quizData, choices: newChoices });
  };

  const handleAddQuizChoice = () => {
    if (quizData.choices.length < 5) {
      setQuizData({ ...quizData, choices: [...quizData.choices, ""] });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (activeTab === "퀴즈") {
        if (!quizData.title.trim()) {
          alert("제목을 입력해주세요.");
          return;
        }

        const filledChoices = quizData.choices
          .map(c => c.trim())
          .filter(c => c !== "");
        if (filledChoices.length < 2) {
          alert("선택지는 최소 2개 이상 입력해주세요.");
          return;
        }

        if (!quizData.answer || isNaN(quizData.answer) || +quizData.answer < 1 || +quizData.answer > filledChoices.length) {
          alert("퀴즈 정답을 선택해주세요.");
          return;
        }
      }

      if (activeTab === "투표") {
        if (!voteData.title.trim()) {
          alert("제목을 입력해주세요.");
          return;
        }

        const filledChoices = voteData.choices
          .map(c => c.trim())
          .filter(c => c !== "");
        if (filledChoices.length < 2) {
          alert("선택지는 최소 2개 이상 입력해주세요.");
          return;
        }
      }

      if (activeTab === "토론") {
        if (!discussionData.title.trim()) {
          alert("제목을 입력해주세요.");
          return;
        }
        if (!discussionData.content.trim()) {
          alert("토론 내용을 입력해주세요.");
          return;
        }
      }

      if (activeTab === "퀴즈" || activeTab === "투표") {
        const choicesArray = (activeTab === "퀴즈" ? quizData.choices : voteData.choices)
          .map(c => c.trim())
          .filter(c => c !== "");

        const options = choicesArray.map((text, idx) => ({
          optionText: text,
          isCorrect: activeTab === "퀴즈" ? +quizData.answer === idx + 1 : false,
          optionOrder: idx
        }));

        const payload = {
          post: {
            userId: user.userId,
            bookTitle: quizData.relatedBook?.trim() || "",
            postType: activeTab === "퀴즈" ? "QUIZ" : "POLL",
            title: activeTab === "퀴즈" ? quizData.title.trim() : voteData.title.trim(),
            content: "" // 퀴즈/투표는 content 비워도 서버 허용
          },
          options
        };

        console.log("퀴즈/투표 payload:", payload); // 서버 전송 전 확인
        await axios.post("/api/community/posts/poll-or-quiz", payload);

      } else if (activeTab === "토론") {
        const payload = {
          userId: user.userId,
          bookTitle: quizData.relatedBook?.trim() || "",
          postType: "DISCUSSION",
          title: discussionData.title.trim(),
          content: discussionData.content.trim()
        };

        console.log("토론 payload:", payload);
        await axios.post("/api/community/posts/discussion", payload);
      }

      alert("커뮤니티에 글이 성공적으로 등록되었습니다.");
      navigate(-1);

    } catch (err) {
      console.error("글 작성 오류:", err);
      alert("글 작성에 실패했습니다. 서버 에러가 발생했을 수 있습니다.");
    }
  };


  return (
    <div className="add-post-container">
      <h2>커뮤니티 글 작성</h2>

      <div className="ap-tabs">
        {["퀴즈", "투표", "토론"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 폼 */}
      <div className="ap-form">
        {activeTab === "퀴즈" && (
          <>
            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={quizData.title}
              onChange={e => setQuizData({ ...quizData, title: e.target.value })}
            />
            <label>관련 도서</label>
            <input
              type="text"
              placeholder="관련 도서명을 작성해주세요"
              value={quizData.relatedBook}
              onChange={e => setQuizData({ ...quizData, relatedBook: e.target.value })}
            />
            <label>선택지</label>
            {quizData.choices.map((choice, index) => (
              <input
                key={index}
                type="text"
                placeholder={`퀴즈 ${index + 1} 번`}
                value={choice}
                onChange={e => handleQuizChoiceChange (index, e.target.value)}
                style={{ marginBottom: "8px" }}
              />
            ))}
            {quizData.choices.length < 5 && (
              <button type="button" className="ap-add-choice-btn" onClick={handleAddQuizChoice }>
                선택지 추가
              </button>
            )}
            <label>퀴즈 정답</label>
              <select
                value={quizData.answer}
                onChange={e => setQuizData({ ...quizData, answer: e.target.value })}
                className="ap-quiz-answer-select"
              >
                <option value="">정답을 선택하세요</option>
                {quizData.choices.map((choice, idx) => (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}번
                  </option>
                ))}
              </select>
          </>
        )}

        {activeTab === "투표" && (
          <>
            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={voteData.title}
              onChange={e => setVoteData({ ...voteData, title: e.target.value })}
            />
            <label>관련 도서</label>
            <input
              type="text"
              placeholder="관련 도서명을 작성해주세요"
              value={quizData.relatedBook}
              onChange={e => setQuizData({ ...quizData, relatedBook: e.target.value })}
            />
            <label>선택지</label>
            {voteData.choices.map((choice, index) => (
              <input
                key={index}
                type="text"
                placeholder={`선택지 ${index + 1}`}
                value={choice}
                onChange={e => handleChoiceChange(index, e.target.value)}
                style={{ marginBottom: "8px" }}
              />
            ))}
            {voteData.choices.length < 5 && (
              <button type="button" className="ap-add-choice-btn" onClick={handleAddChoice}>
                선택지 추가
              </button>
            )}
          </>
        )}

        {activeTab === "토론" && (
          <>
            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={discussionData.title}
              onChange={e => setDiscussionData({ ...discussionData, title: e.target.value })}
            />
            <label>관련 도서</label>
            <input
              type="text"
              placeholder="관련 도서명을 작성해주세요"
              value={quizData.relatedBook}
              onChange={e => setQuizData({ ...quizData, relatedBook: e.target.value })}
            />
            <label>토론 내용</label>
            <textarea
              className="ap-content-textarea"
              placeholder="토론 내용을 작성해주세요"
              value={discussionData.content}
              onChange={e => setDiscussionData({ ...discussionData, content: e.target.value })}
            />
          </>
        )}
        <div className="ap-form-buttons">
          <button onClick={handleCancel}>취소</button>
          <button onClick={handleSubmit}>작성하기</button>
        </div>
      </div>
    </div>
  );
}
