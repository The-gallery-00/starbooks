import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/axiosInstance";
import './HomeCommunity.css';

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export function HomeCommunity() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/api/community/posts");
        const safePosts = (res.data || []).filter(post => post && post.postId && post.createdAt);

        safePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(safePosts);
      } catch (err) {
        console.error("게시글 조회 실패", err);
      }
    };
    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const latestPosts = sortedPosts.slice(0, 4);

  const handleMoreClick = () => {
    navigate("/community"); 
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
        {latestPosts.map(post => {
          const MAX_TITLE_LENGTH = 30;
          const MAX_CONTENT_LENGTH = 80;
          const truncatedTitle = truncateText(post.title, MAX_TITLE_LENGTH);
          const truncatedContent = truncateText(post.content, MAX_CONTENT_LENGTH);
          const formattedDate = post.createdAt
            ? new Date(post.createdAt).toISOString().slice(0, 10).replace(/-/g, '/')
            : '';

          return (
            <div 
              key={post.postId} 
              className="hcm-post"
              onClick={() => navigate(`/detail-post/${post.postId}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="hcm-post-header">
                <div className="hcm-author-info">
                  <div className="hcm-author-avatar">👤</div>
                  <div className="hcm-author-details">
                    <div className="hcm-post-time">{formattedDate}</div>
                  </div>
                </div>
                <span className="hcm-post-category">
                  {post.postType === 'DISCUSSION' ? '토론' : post.postType === 'QUIZ' ? '퀴즈' : '투표'}
                </span>
              </div>
              <h3 className="hcm-post-title">{truncatedTitle}</h3>
              {post.bookTitle && post.bookTitle.trim() !== "" && (
                <p className="cl-post-related-book">
                  <span className="related-label">관련 도서 :</span> {post.bookTitle}
                </p>
              )}
              <p className="post-content-preview">{truncatedContent}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
