import React, { useContext, useEffect, useState } from "react";
import './MyProfile.css';
import defaultProfile from './profile.jpg';
import api from "./api/axiosInstance";
import { UserContext } from "./UserContext";

const MyProfile = () => {
  const { user } = useContext(UserContext); 
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await api.get(`/api/users/${user.userId}`);
         setProfile({
          ...res.data,
          profileImage: res.data.profileImage || null, 
        });
        console.log("내 프로필: ", res.data)

      } catch (error) {
        console.error("내 프로필 불러오기 실패:", error);
        alert("프로필을 불러오지 못했습니다.");
      }
    };

    if (user) fetchMyProfile();
  }, [user]);
  

  if (!profile) return <p>로딩 중...</p>;

  return (
    <div className="profile-container">
      <img
        src={profile.profileImage || defaultProfile}
        alt="프로필"
        className="profile-image"
      />
      <div className="profile-info">
        <div className="name-id">
          <h2 className="nickname">{profile.nickname}</h2>
        </div>

        {profile.intro && <p className="bio">{profile.intro}</p>}

        <div className="favorites">
          {profile.favoriteAuthors?.length > 0 && (
            <p>
              <strong>좋아하는 작가:</strong> {profile.favoriteAuthors.join(", ")}
            </p>
          )}

          {profile.favoriteGenres?.length > 0 && (
            <p>
              <strong>선호 장르:</strong> {profile.favoriteGenres.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
