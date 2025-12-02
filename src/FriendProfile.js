// FriendProfile.js
import './FriendProfile.css'

const FriendProfile = ({ profile }) => {
  const user = profile;

  return (
    <div className="profile-container">
      <img src={user.profileImage} alt="프로필" className="profile-image"/>
      <div className="profile-info">
        <div className="name-id">
          <h2 className="nickname">{user.nickname}</h2>
          <span className="user-id">@{user.userId}</span>
        </div>

        <p className="bio">{user.bio}</p>

        <div className="favorites">
          {user.favoriteAuthors?.length > 0 && (
            <p><strong>좋아하는 작가:</strong> {user.favoriteAuthors.join(", ")}</p>
          )}
          {user.preferredGenres?.length > 0 && (
            <p><strong>선호 장르:</strong> {user.preferredGenres.join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
