import React, { useState, useEffect } from "react";
import MyProfile from "./MyPofile";
import "./ProfileSetting.css";

export default function ProfileSetting() {
  const initialData = {
    nickname: "aaaa",
    bio: "안녕하세요! 다양한 장르의 책을 좋아합니다.",
    favoriteAuthor: "헤르만 헤세",
    favoriteGenre: "소설, SF, 철학"
  };

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [favoriteAuthor, setFavoriteAuthor] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");

  const [nicknameMessage, setNicknameMessage] = useState({ text: "", color: "" });

  // 초기 데이터 로드
  useEffect(() => {
    resetFields();
  }, []);

  const resetFields = () => {
    setNickname(initialData.nickname);
    setBio(initialData.bio);
    setFavoriteAuthor(initialData.favoriteAuthor);
    setFavoriteGenre(initialData.favoriteGenre);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("설정 완료!");
    console.log({ nickname, bio, favoriteAuthor, favoriteGenre });
  };

  const handleCheckDuplicate = () => {
    if (nickname === "aaaa") {
      setNicknameMessage({ text: "중복된 닉네임입니다.", color: "red" });
      setNickname(initialData.nickname); // 이전 값 복원
    } else {
      setNicknameMessage({ text: "사용 가능한 닉네임입니다.", color: "green" });
    }
  };

  return (
    <div className="profile-form">
      <MyProfile />
      <h3>프로필 설정</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="nickname-label">
            닉네임
              <div className="input-with-button">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button type="button" className="check-button" onClick={handleCheckDuplicate}>
                중복 확인
              </button>
            </div>
            {nicknameMessage.text && (
              <span
                className="duplicate-check-message"
                style={{ color: nicknameMessage.color }}
              >
                {nicknameMessage.text}
              </span>
            )}
          </label>
          <label>
            자기소개
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개를 작성해주세요"
            />
          </label>

          <label>
            좋아하는 작가
            <input
              type="text"
              value={favoriteAuthor}
              onChange={(e) => setFavoriteAuthor(e.target.value)}
              placeholder="좋아하는 작가를 알려주세요"
            />
          </label>

          <label>
            선호하는 장르
            <input
              type="text"
              value={favoriteGenre}
              onChange={(e) => setFavoriteGenre(e.target.value)}
              placeholder="선호하는 장르를 알려주세요"
            />
          </label>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={resetFields}>취소</button>
          <button type="submit">설정하기</button>
        </div>
      </form>
    </div>
  );
}
