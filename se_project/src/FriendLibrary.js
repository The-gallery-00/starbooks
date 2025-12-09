// FriendLibrary.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FriendProfile from "./FriendProfile";
import FriendBookList from "./FriendBookList";
import FriendRecords from "./FriendRecords";
import "./FriendLibrary.css";

export default function FriendLibrary() {
  const { id } = useParams();

  const friendData = {
    profile: {
      nickname: "책책책을읽읍시다",
      bio: "안녕하세요~",
      favoriteAuthors: ["헤르만 헤세"],
      favoriteGenres: ["소설", "철학"],
    },
    books: {
      reading: [
        { id: 1, title: "데미안", author: "헤르만 헤세", progress: "50%", cover: "https://img1.daumcdn.net/thumb/R1280x0.fwebp/?fname=http://t1.daumcdn.net/brunch/service/user/7H8p/image/MsFtcopMcsD1h86nbkxGzcjv0mo.JPG" },],
      finished: [],
      wishlist: []
    },
    records: [
      { id: 1, bookTitle: "데미안", rating: 5, summary: "주인공의 성장 이야기", date: "2025/11/05" },
      { id: 2, bookTitle: "죄와 벌", rating: 4, summary: "인간 심리와 죄의식", date: "2025/11/07" },
      { id: 3, bookTitle: "노인과 바다", rating: 5, summary: "인간과 자연의 투쟁", date: "2025/11/10" },
      { id: 4, bookTitle: "소설가 구보씨의 일일", rating: 3, summary: "소설가의 하루 이야기", date: "2025/11/12" }
    ]
  };

  const handleFriendRequest = (user) => {
    console.log(`친구 신청: ${user.nickname}`);
    alert(`${user.nickname}님에게 친구 신청이 완료되었습니다.`);
  };

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="friend-library-container">
      <div className="friend-library-wrapper">
        <FriendProfile
          profile={friendData.profile}
          onFriendRequest={handleFriendRequest}
        />
        <FriendBookList myBooks={friendData.books} />
        <FriendRecords records={friendData.records} />
      </div>
    </div>
  );
}
