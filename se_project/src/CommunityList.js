import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api/axiosInstance';
import './CommunityList.css';

const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const PostCard = ({ postId, postType, title, bookTitle, content, createdAt, userId }) => {
    const typeColors = {
        'DISCUSSION': '#A98A6A',
        'QUIZ': '#A98A6A',
        'POLL': '#A98A6A' 
    };
    const typeColor = typeColors[postType] || '#803D3B';
    const navigate = useNavigate();

    const MAX_TITLE_LENGTH = 30;
    const MAX_CONTENT_LENGTH = 80;

    const truncatedTitle = truncateText(title, MAX_TITLE_LENGTH);
    const truncatedContent = truncateText(content, MAX_CONTENT_LENGTH);

    // 날짜 포맷 변환 (YYYY/MM/DD)
    const formattedDate = createdAt ? new Date(createdAt).toISOString().slice(0, 10).replace(/-/g, '/') : '';

    return (
        <div 
            className="post-card" 
            onClick={() => navigate(`/detail-post/${postId}`)} 
            style={{ cursor: 'pointer' }}
        >
            <div className="post-header">
                <span className="post-type" style={{ backgroundColor: typeColor }}>
                    {postType === 'DISCUSSION' ? '토론' : postType === 'QUIZ' ? '퀴즈' : '투표'}
                </span>
                <span className="post-date">{formattedDate}</span>
            </div>
            
            <h3 className="cml-post-title">{truncatedTitle}</h3>
            
            {bookTitle && bookTitle.trim() !== "" && (
                <p className="cl-post-related-book">
                    <span className="related-label">관련 도서 :</span> {bookTitle}
                </p>
            )}
            
            <p className="post-content-preview">{truncatedContent}</p>
            
            {/* <p className="post-author">작성자: {userId}</p>  */}
        </div>
    );
};

export default function CommunityList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        // 페이지 로드 시 API 호출
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/community/posts');
                console.log("응답 전체:", response.data);
                setPosts(response.data);
            } catch (err) {
                console.error('게시글 조회 실패:', err);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // 최신순 정렬
    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const selectedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

    const pagesPerGroup = 3;
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    return (
        <div className="community-container">
            <div className="community-header">
                <div className="sort-options">
                    <span className="sort-label">최신순</span>
                </div>
                <a href="/add-post" className="write-button-link"> 
                    <button className="write-button">새 글 작성</button>
                </a>
            </div>

            <div className="post-list">
                {selectedPosts.map((post, index) => (
                    <PostCard 
                        key={post.postId ?? `post-${index}`} 
                        {...post} />
                ))}
            </div>

            {posts.length > postsPerPage && (
                <div className="cl-pagination">
                    <button 
                        className="cl-page-btn"
                        onClick={() => setCurrentPage(startPage - pagesPerGroup)}
                        disabled={startPage === 1}
                    >
                        ＜
                    </button>

                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                        const pageNum = startPage + i;
                        return (
                            <button
                                key={pageNum}
                                className={`cl-page-number ${currentPage === pageNum ? "active" : ""}`}
                                onClick={() => setCurrentPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button 
                        className="cl-page-btn"
                        onClick={() => setCurrentPage(endPage + 1)}
                        disabled={endPage === totalPages}
                    >
                        ＞
                    </button>
                </div>
            )}
        </div>
    );
}
