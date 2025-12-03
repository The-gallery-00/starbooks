import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";

export default function AddPost() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("퀴즈");

  const [quizData, setQuizData] = useState({
    title: "",
    choices: ["", ""],
    answer: ""
  });

  const [voteData, setVoteData] = useState({ title: "", choices: ["", ""] }); // 기본 2개 선택지
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

  const handleSubmit = () => {
    // 유효성 검사
    if (activeTab === "퀴즈") {
      // 제목과 내용 체크
      if (!quizData.title) {
        alert("제목을 입력해주세요.");
        return;
      }

      // 선택지 최소 2개 이상 입력 여부 체크
      const filledChoices = quizData.choices.filter(c => c.trim() !== "");
      if (filledChoices.length < 2) {
        alert("선택지는 최소 2개 이상 입력해주세요.");
        return;
      }

      // 정답 체크
      if (!quizData.answer || isNaN(quizData.answer) || +quizData.answer < 1 || +quizData.answer > filledChoices.length) {
        alert("퀴즈 정답을 선택해주세요.");
        return;
      }
    }


    if (activeTab === "투표") {
      if (!voteData.title) {
        alert("제목을 입력해주세요.");
        return;
      }

      // 최소 2개의 선택지가 입력되어야 함
      const filledChoices = voteData.choices.filter(c => c.trim() !== "");
      if (filledChoices.length < 2) {
        alert("선택지는 최소 2개 이상 입력해주세요.");
        return;
      }
    }

    if (activeTab === "토론") {
      if (!discussionData.title) {
        alert("제목을 입력해주세요.");
        return;
      }

      if (!discussionData.content) {
        alert("토론 내용을 입력해주세요.");
        return;
      }
    }

    // 전송 데이터
    const postPayload = {
        type: activeTab,
        quizData,
        voteData: {
        title: voteData.title,
        choices: voteData.choices.filter(c => c.trim() !== "") // 입력된 선택지만 전송
        },
        discussionData
    };

    console.log("전송 데이터:", postPayload);

    alert("커뮤니티에 글이 성공적으로 등록되었습니다.")
    navigate(-1); 
  };

  return (
    <div className="add-post-container">
      <h2>커뮤니티 글 작성</h2>

      {/* 탭 */}
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

        {/* 버튼 */}
        <div className="ap-form-buttons">
          <button onClick={handleCancel}>취소</button>
          <button onClick={handleSubmit}>작성하기</button>
        </div>
      </div>
    </div>
  );
}
