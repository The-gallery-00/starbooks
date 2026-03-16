import { useNavigate } from "react-router-dom";
import './HomeCommunity.css';

export function HomeCommunity() {
  const navigate = useNavigate();
  const posts = [
    {
      id: 1,
      author: '책벌레123',
      avatar: '👤',
      time: '5분 전',
      title: '오늘 드디어 "데미안"을 다 읽었어요! 정말 감동적인 작품이네요. 특히 마지막 부분이...',
      category: '토론'
    },
    {
      id: 2,
      author: '북러버',
      avatar: '👤',
      time: '1시간 전',
      title: '추천 부탁드려요! SF 소설 중에 재미있게 읽을만한 책 있을까요? 최근에 읽은 건 "삼체"입니다.',
      category: '투표'
    },
    {
      id: 3,
      author: '독서왕',
      avatar: '👤',
      time: '3시간 전',
      title: '이번 달 챌린지 목표 달성했어요! 5권 읽기 성공 🎉 다들 화이팅입니다!',
      category: '퀴즈'
    },
    {
      id: 4,
      author: '문학소녀',
      avatar: '👤',
      time: '5시간 전',
      title: '한강 작가님의 "채식주의자"를 읽고 있는데, 해석이 정말 다양할 것 같아요. 여러분은 어떻게 생각하세요?',
      category: '토론'
    }
  ];

  const handleMoreClick = () => {
    navigate("/community"); // communityList.js가 라우팅된 경로
  };

  return (
    <section className="hcm-section">
      <div className="hcm-header">
        <div className="hcm-title-wrapper">
          <h2 className="hcm-title">최근 커뮤니티</h2>
        </div>
        <button className="hcm-more-btn" onClick={handleMoreClick}>
          더보기
        </button>
      </div>

      <div className="hcm-posts">
        {posts.map(post => (
          <div key={post.id} className="hcm-post">
            <div className="hcm-post-header">
              <div className="hcm-author-info">
                <div className="hcm-author-avatar">{post.avatar}</div>
                <div className="hcm-author-details">
                  <div className="hcm-author-name">{post.author}</div>
                  <div className="hcm-post-time">{post.time}</div>
                </div>
              </div>
              <span className="hcm-post-category">{post.category}</span>
            </div>
            <p className="hcm-post-title">{post.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
