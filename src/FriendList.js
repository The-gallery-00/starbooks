// FriendList.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import ProfileImage from "./profile.jpg";
import "./FriendList.css";

export default function FriendList() {
  const navigate = useNavigate();

  const [pendingFriends, setPendingFriends] = useState([
    { id: 1, username: "aa", nickname: "user1" },
    { id: 2, username: "aa", nickname: "user2" },
  ]);

  const [friends, setFriends] = useState([
    { id: 3, username: "aa", nickname: "friend1" },
    { id: 4, username: "aa", nickname: "friend2" },
    { id: 5, username: "aa", nickname: "friend2" },
    { id: 6, username: "aa", nickname: "friend2" },
    { id: 7, username: "aa", nickname: "friend2" },
    { id: 8, username: "aa", nickname: "friend2" },
    { id: 9, username: "aa", nickname: "friend2" },
    { id: 10, username: "aa", nickname: "friend2" },
    { id: 11, username: "aa", nickname: "friend2" },
    { id: 12, username: "aa", nickname: "friend2" },
    { id: 13, username: "aa", nickname: "friend2" },
    { id: 14, username: "aa", nickname: "friend2" },
    { id: 15, username: "aa", nickname: "friend2" },
    { id: 16, username: "aa", nickname: "friend2" },
    { id: 17, username: "aa", nickname: "friend2" },
    { id: 18, username: "aa", nickname: "friend2" },
    { id: 19, username: "aa", nickname: "friend2" },
    { id: 20, username: "aa", nickname: "friend2" },
    { id: 21, username: "aa", nickname: "friend2" },
    { id: 22, username: "aa", nickname: "friend2" },
    { id: 23, username: "aa", nickname: "friend2" },

  ]);

  const [dropdownOpenId, setDropdownOpenId] = useState(null);

   // 모달 관련 상태
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const acceptFriend = (id) => {
    const friend = pendingFriends.find((f) => f.id === id);
    setFriends([...friends, friend]);
    setPendingFriends(pendingFriends.filter((f) => f.id !== id));
  };

  const deletePendingFriend = (id) => {
    setPendingFriends(pendingFriends.filter((f) => f.id !== id));
  };

  const removeFriend = (id) => {
    setFriends(friends.filter((f) => f.id !== id));
    setDropdownOpenId(null); // 삭제 후 드롭다운 닫기
  };

  const goToFriendLibrary = (id) => {
    navigate(`/friend/${id}`);
  };

  // 모달 검색
  const handleSearch = () => {
    // 실제로는 API 호출을 여기서 수행
    // 예시: username 또는 nickname 포함 검색
    const results = [...pendingFriends, ...friends].filter(
      (f) =>
        f.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleReset = () => {
    setSearchTerm("");     // 검색어 초기화
    setSearchResults([]);  // 검색결과 초기화
  };


  return (
    <div className="friend-list-container">      
      <h3>친구 수락 대기 {pendingFriends.length}</h3>
      {pendingFriends.map((f) => (
        <div key={f.id} className="friend-item">
          <div
            className="friend-profile"
            onClick={() => goToFriendLibrary(f.id)}
            style={{ cursor: "pointer" }}
          >
            <img className="friend-img" src={ProfileImage} alt="프로필" />
            <span>{f.nickname} <small>@{f.username}</small></span>
          </div>
          <div className="friend-actions">
            <button className="fl-action-btn fl-accept-btn" onClick={() => acceptFriend(f.id)}>수락</button>
            <button className="fl-action-btn fl-delete-btn" onClick={() => deletePendingFriend(f.id)}>삭제</button>
          </div>
        </div>
      ))}

      <h3>친구 목록 {friends.length}
        <button
          className="open-friend-search-btn"
          onClick={() => setSearchModalOpen(true)}
        >
          친구 검색
      </button>
      </h3>
      {friends.map((f) => (
        <div key={f.id} className="friend-item">
          <div
            className="friend-profile"
            onClick={() => goToFriendLibrary(f.id)}
            style={{ cursor: "pointer" }}
          >
            <img className="friend-img" src={ProfileImage} alt="프로필" />
            <span>{f.nickname} <small>@{f.username}</small></span>
          </div>
          <div className="friend-actions">
            <button
              className="fl-menu-btn"
              onClick={() =>
                setDropdownOpenId(dropdownOpenId === f.id ? null : f.id)
              }
            >
              <IoEllipsisVertical size={20} />
            </button>
            {dropdownOpenId === f.id && (
              <div className="fl-dropdown-menu">
                <button onClick={() => removeFriend(f.id)}>친구 삭제</button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 친구 검색 모달 */}
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
                      {f.nickname} <small>@{f.username}</small>
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
                setSearchTerm("");        // 검색창 초기화
                setSearchResults([]);     // 검색결과 초기화
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
