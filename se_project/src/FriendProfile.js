import React from 'react';
import './FriendProfile.css';
import defaultProfile from './profile.jpg';

const FriendProfile = ({ profile, onFriendRequest }) => {
  const user = profile || {};

  return (
    <div className="friend-profile-container profile-container">
      <img
        src={user.profileImage || defaultProfile}
        alt="프로필"
        className="friend-profile-image"
      />
      <div className="friend-profile-info">
        <div className="friend-name-id">
          <h2 className="friend-nickname">{user.nickname || "닉네임 없음"}</h2>
          {onFriendRequest && (
            <button
              className="friend-request-btn"
              onClick={() => onFriendRequest(profile)}
            >
              친구 신청
            </button>
          )}
        </div>
        {user.intro && <p className="friend-bio">{user.bio}</p>}

        <div className="friend-favorites">
          {user.favoriteAuthors && user.favoriteAuthors.length > 0 && (
            <p>
              <strong>좋아하는 작가:</strong> {user.favoriteAuthors.join(', ')}
            </p>
          )}

          {user.favoriteGenres && user.favoriteGenres.length > 0 && (
            <p>
              <strong>선호 장르:</strong> {user.favoriteGenres.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
