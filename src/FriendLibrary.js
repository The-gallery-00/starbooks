// FriendLibrary.js
import React from "react";
import { useParams } from "react-router-dom";
import FriendProfile from "./FriendProfile";
import FriendBookList from "./FriendBookList";
import FriendRecords from "./FriendRecords";
import "./FriendLibrary.css";

export default function FriendLibrary() {
  const { id } = useParams();

  // 실제 서비스에서는 id로 API 호출해서 친구 데이터 받아와야함
  // 지금은 임시 더미 데이터 형태
  const friendData = {
    profile: {
      nickname: "친구닉네임",
      userId: id,
      bio: "안녕하세요! 책 읽기 좋아합니다.",
      favoriteAuthors: ["헤르만 헤세"],
      preferredGenres: ["소설", "철학"],
      profileImage: "/default-profile.jpg"
    },
    books: {
      reading: [],
      finished: [],
      wishlist: []
    },
    records: []
  };

  return (
    <div className="friend-library-container">
      <FriendProfile profile={friendData.profile} />
      <FriendBookList myBooks={friendData.books} />
      <FriendRecords records={friendData.records} />
    </div>
  );
}
