import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FriendProfile from "./FriendProfile";
import FriendBookList from "./FriendBookList";
import FriendRecords from "./FriendRecords";
import "./FriendLibrary.css";
import api from "./api/axiosInstance";
import { UserContext } from "./UserContext";

export default function FriendLibrary() {
  const { id } = useParams();
  const { user } = useContext(UserContext); 

  const [friendProfile, setFriendProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const friendBooks = {
    reading: [
      {
        id: 1,
        title: "데미안",
        author: "헤르만 헤세",
        progress: "50%",
        cover:
          "https://img1.daumcdn.net/thumb/R1280x0.fwebp/?fname=http://t1.daumcdn.net/brunch/service/user/7H8p/image/MsFtcopMcsD1h86nbkxGzcjv0mo.JPG",
      },
    ],
    finished: [],
    wishlist: [],
  };

  const friendRecords = [
    { id: 1, bookTitle: "데미안", rating: 5, summary: "주인공의 성장 이야기", date: "2025/11/05" },
    { id: 2, bookTitle: "죄와 벌", rating: 4, summary: "인간 심리와 죄의식", date: "2025/11/07" },
    { id: 3, bookTitle: "노인과 바다", rating: 5, summary: "인간과 자연의 투쟁", date: "2025/11/10" },
    { id: 4, bookTitle: "소설가 구보씨의 일일", rating: 3, summary: "소설가의 하루 이야기", date: "2025/11/12" },
  ];

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const res = await api.get(`/api/users/${id}`);
        setFriendProfile({
          ...res.data,
          profileImage: res.data.profileImage || null, 
        });
      } catch (error) {
        console.error("친구 프로필 조회 실패:", error);
        alert("친구 프로필을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendProfile();
  }, [id]);

  const handleFriendRequest = async (friendUser) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      console.log("친구 신청 요청:", {
        requesterId: user.userId,
        receiverId: id
      });

      const res = await api.post("/api/friends/request", null, {
        params: {
          requesterId: user.userId,
          receiverId: Number(id)
        }
      });

      console.log("친구 신청 응답:", res.data);
      alert(`${friendUser.nickname}님에게 친구 신청이 완료되었습니다.`);

    } catch (error) {
      console.error("친구 신청 실패:", error);
      const errorMessage =
        error.response?.data?.message || 
        error.response?.data || 
        "친구 신청에 실패했습니다.";

      if (typeof errorMessage === "string" && errorMessage.includes("이미 친구")) {
        alert("이미 서로 친구입니다!");
      } else {
        alert(errorMessage);
      }
    }
  };

  if (loading) return <p>친구 프로필을 불러오는 중...</p>;
  if (!friendProfile) return <p>친구를 찾을 수 없습니다.</p>;

  return (
    <div className="friend-library-container">
      <div className="friend-library-wrapper">
        <FriendProfile
          profile={friendProfile}
          onFriendRequest={handleFriendRequest}
        />
        <FriendBookList myBooks={friendBooks} />
        <FriendRecords records={friendRecords} />
      </div>
    </div>
  );
}
