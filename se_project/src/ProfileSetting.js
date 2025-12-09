import React, { useState, useEffect, useContext } from "react";
import MyProfile from "./MyPofile";
import "./ProfileSetting.css";
import api from "./api/axiosInstance";
import { UserContext } from "./UserContext";

export default function ProfileSetting() {
  const { user, setUser } = useContext(UserContext);

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [favoriteAuthor, setFavoriteAuthor] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [nicknameMessage, setNicknameMessage] = useState({
    text: "",
    color: "",
  });

  useEffect(() => {
    if (!user) return;

    api.get(`/api/users/${user.userId}`)
      .then((res) => {
        console.log("[GET] 유저 정보 로드 성공:", res.data);
        const data = res.data;
        setNickname(data.nickname || "");
        setBio(data.intro || "");
        setFavoriteAuthor(data.favoriteAuthor || "");
        setFavoriteGenre(data.favoriteGenre || "");
        setProfileImage(data.profileImage || "");
      })
      .catch((err) => {
        console.log("[GET] 유저 정보 로드 실패:", err.response);
        console.log("에러 데이터:", err.response?.data);
      });
  }, [user]);

  const handleCheckDuplicate = () => {
    if (!nickname.trim()) return;

    api
      .get(`/api/users/check-nickname?nickname=${nickname}`)
      .then((res) => {
        const isDuplicate = res.data;

        if (isDuplicate) {
          setNicknameMessage({ text: "중복된 닉네임입니다.", color: "red" });
        } else {
          setNicknameMessage({ text: "사용 가능한 닉네임입니다.", color: "green" });
        }
      })
      .catch((err) => {
        setNicknameMessage({ text: "중복 확인 실패", color: "red" });

        console.log("[GET] 닉네임 체크 실패:", err.response);
        console.log("에러 데이터:", err.response?.data);
      });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const updateBody = {
      nickname,
      intro: bio,
      favoriteAuthor,
      favoriteGenre,
      profileImage,
    };

    api
      .put(`/api/users/${user.userId}`, updateBody)
      .then((res) => {
        alert("프로필이 성공적으로 업데이트되었습니다!");

        console.log("업데이트 내용: ", res.data)
        const updatedUser = { ...user, ...res.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((err) => {
        console.error("[PUT] 프로필 업데이트 실패:", err.response);
        console.error("에러 데이터:", err.response?.data);
        alert("업데이트 실패!");
      });
  };

  // 취소 = 다시 API 데이터로 초기화
  const resetFields = () => {
    if (!user) return;

    api.get(`/api/users/${user.userId}`).then((res) => {
      const data = res.data;
      setNickname(data.nickname || "");
      setBio(data.intro || "");
      setFavoriteAuthor(data.favoriteAuthor || "");
      setFavoriteGenre(data.favoriteGenre || "");
      setProfileImage(data.profileImage || "");
    });
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
