import React from 'react';
import './MyProfile.css';
import profileImage from './profile.jpg'

const MyProfile = () => {
  const user = {
    profileImage: profileImage,
    nickname: 'aaaa',
    userId: '12345',
    bio: '안녕하세요! 다양한 장르의 책을 좋아합니다.',
    favoriteAuthors: ['헤르만 헤세', '조지 오웰', '무라카미 하루키'],
    preferredGenres: ['소설', 'SF', '철학']
  };

  return (
    <div className="profile-container">
      <img
        src={user.profileImage}
        alt="프로필"
        className="profile-image"
      />
      <div className="profile-info">
        <div className="name-id">
          <h2 className="nickname">{user.nickname}</h2>
          <span className="user-id">@{user.userId}</span>
        </div>
        <p className="bio">{user.bio}</p>

        <div className="favorites">
          {user.favoriteAuthors && user.favoriteAuthors.length > 0 && (
            <p>
              <strong>좋아하는 작가:</strong> {user.favoriteAuthors.join(', ')}
            </p>
          )}

          {user.preferredGenres && user.preferredGenres.length > 0 && (
            <p>
              <strong>선호 장르:</strong> {user.preferredGenres.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
