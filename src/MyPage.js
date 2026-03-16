import React, { useState } from "react";
import ProfileSetting from "./ProfileSetting";
import FriendList from "./FriendList";
import "./MyPage.css";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="mypage-wrapper">
      <div className="mypage-container">
        <aside className="sidebar">
          <h2 className="sidebar-title">마이페이지</h2>
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            프로필 설정
          </button>
          <button
            className={activeTab === "friends" ? "active" : ""}
            onClick={() => setActiveTab("friends")}
          >
            친구 목록
          </button>
        </aside>

        <main className="main-content">
          {activeTab === "profile" && <ProfileSetting />}
          {activeTab === "friends" && <FriendList />}
        </main>
      </div>
    </div>
  );
}
