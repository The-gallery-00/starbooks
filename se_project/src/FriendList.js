import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axiosInstance";
import { UserContext } from "./UserContext";
import ProfileImage from "./profile.jpg";
import "./FriendList.css";

export default function FriendList() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user?.userId;

  const [pendingFriends, setPendingFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!userId) return;

      try {
        // 받은 친구 요청 목록
        const pendingRes = await api.get(`/api/friends/${userId}/pending`);
        console.log("받은 친구 요청:", pendingRes.data);
        setPendingFriends(pendingRes.data);

        // 이미 수락된 친구 목록
        const friendsRes = await api.get(`/api/friends/${userId}`);
        console.log("친구 목록:", friendsRes.data);
        setFriends(friendsRes.data.filter(f => f.status === "ACCEPTED"));

      } catch (error) {
        console.error("친구 목록 가져오기 실패:", error);
      }
    };

    fetchFriends();
  }, [userId]);


  const acceptFriend = async (friendshipId) => {
    try {
      const res = await api.post("/api/friends/accept", null, { params: { friendshipId } });
      console.log("수락 응답:", res.data);
      alert("친구 요청을 수락하였습니다.");

      const friend = pendingFriends.find(f => f.friendshipId === friendshipId);
      setFriends([...friends, friend]);
      setPendingFriends(pendingFriends.filter(f => f.friendshipId !== friendshipId));
    } catch (error) {
      console.error("친구 수락 실패:", error);
    }
  };

  const deletePendingFriend = async (friendshipId) => {
    try {
      const res = await api.post("/api/friends/reject", null, { params: { friendshipId } });
      console.log("거절 응답:", res.data);
      alert("친구 요청을 거절하였습니다.");

      setPendingFriends(pendingFriends.filter(f => f.friendshipId !== friendshipId));
    } catch (error) {
      console.error("친구 거절 실패:", error);
    }
  };

  const goToFriendLibrary = (friendId) => {
    navigate(`/friend/${friendId}`);
  };

  const handleSearch = async () => {
    try {
      if (!searchTerm) return;
      const res = await api.get("/api/friends/search-users", {
        params: { keyword: searchTerm }
      });
      console.log("검색 응답:", res.data);
      setSearchResults(res.data);
    } catch (error) {
      console.error("친구 검색 실패:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  if (!user) {
    return <p>로그인 후 이용 가능합니다.</p>;
  }

  return (
    <div className="friend-list-container">
      <h3>친구 수락 대기 {pendingFriends.length}</h3>
      {pendingFriends.map((f) => (
        <div key={f.friendshipId} className="friend-item">
          <div
            className="friend-profile"
            onClick={() => goToFriendLibrary(f.friendId)}
            style={{ cursor: "pointer" }}
          >
            <img className="friend-img" src={ProfileImage} alt="프로필" />
            <span>{f.friendNickname}</span>
          </div>
          <div className="friend-actions">
            <button className="fl-action-btn fl-accept-btn" onClick={() => acceptFriend(f.friendshipId)}>수락</button>
            <button className="fl-action-btn fl-delete-btn" onClick={() => deletePendingFriend(f.friendshipId)}>거절</button>
          </div>
        </div>
      ))}

      <h3>
        친구 목록 {friends.length}
        <button
          className="open-friend-search-btn"
          onClick={() => setSearchModalOpen(true)}
        >
          친구 검색
        </button>
      </h3>
      {friends.map((f) => (
        <div key={f.friendshipId} className="friend-item">
          <div
            className="friend-profile"
            onClick={() => goToFriendLibrary(f.friendId)}
            style={{ cursor: "pointer" }}
          >
            <img className="friend-img" src={ProfileImage} alt="프로필" />
            <span>{f.friendNickname} </span>
          </div>
        </div>
      ))}

      {searchModalOpen && (
        <div className="fl-search-modal">
          <div className="fl-search-modal-content">
            <h3>친구 검색</h3>
            <div className="fl-search-modal-header">
              <input
                type="text"
                placeholder="닉네임 입력"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="friend-search-input"
              />
              <button className="fl-cancel-btn" onClick={handleReset}>
                초기화
              </button>
            </div>
            <div className="fl-search-results">
              {searchResults.length === 0 ? (
                <p>검색결과가 없습니다.</p>
              ) : (
                searchResults.map((f) => (
                  <div
                    key={f.id}
                    className="friend-search-list"
                    onClick={() => goToFriendLibrary(f.id)}
                  >
                    <img className="fl-modal-friend-img" src={ProfileImage} alt="프로필" />
                    <span>
                      {f.nickname}
                    </span>
                  </div>
                ))
              )}
            </div>
            <button className="fl-search-btn" onClick={handleSearch}>
              검색
            </button>
            <button
              className="fl-close-modal-btn"
              onClick={() => {
                setSearchModalOpen(false);
                handleReset();
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
