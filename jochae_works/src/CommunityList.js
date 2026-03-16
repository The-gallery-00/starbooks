import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunityList.css';

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const PostCard = ({ id, type, title, relatedBook, content, date, author }) => {
    const typeColors = {
        '토론': '#A98A6A',
        '퀴즈': '#A98A6A',
        '투표': '#A98A6A' 
    };
    const typeColor = typeColors[type] || '#803D3B';

    const navigate = useNavigate();

    const MAX_TITLE_LENGTH = 30;
    const MAX_CONTENT_LENGTH = 80;
    
    const truncatedTitle = truncateText(title, MAX_TITLE_LENGTH);
    const truncatedContent = truncateText(content, MAX_CONTENT_LENGTH);

    return (
        <div 
            className="post-card" 
            onClick={() => navigate(`/detail-post/${id}/${type}`)} 
            style={{ cursor: 'pointer' }}
        >
            <div className="post-header">
                <span className="post-type" style={{ backgroundColor: typeColor }}>
                    {type}
                </span>
                <span className="post-date">{date}</span>
            </div>
            
            <h3 className="cml-post-title">{truncatedTitle}</h3>
            
            {relatedBook && relatedBook.trim() !== "" && (
                <p className="cl-post-related-book">
                    <span className="related-label">관련 도서 :</span> {relatedBook}
                </p>
            )}
            
            <p className="post-content-preview">{truncatedContent}</p>
            
            <p className="post-author">작성자: {author}</p> 
        </div>
    );
};

export default function CommunityList() {

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const posts = [
        { 
            id: 1, type: '토론', 
            title: '데미안에서 나타나는 자아 발견의 의미가 너무 길어서 줄임표가 나타나야 합니다.', 
            relatedBook: '데미안', 
            content: '헤르만 헤세의 데미안에서 주인공의 성장 과정을 통해 자아를 발견하고 어쩌구 저쩌구 긴 내용입니다. 이 내용도 요약이 되어야 보기 좋겠지요? 네 그렇게 할 것입니다.', 
            date: '2025/11/10',
            author: 'bb'
        },
        { 
            id: 2, type: '퀴즈', 
            title: '1984 테스트: 빅 브라더는 무엇을 상징하는가?', 
            relatedBook: '1984', 
            content: '빅 브라더가 상징하는 것은 무엇일까요? 독재 정권? 감시 시스템? 아니면 현대인의 익명성?', 
            date: '2025/11/01',
            author: 'STARBOOKS 운영팀'
        },
        { 
            id: 3, type: '투표', 
            title: '내가 만약 모비딕이라면: 에이허브 선장을 피할까?', 
            relatedBook: '모비딕', 
            content: '나를 쫓는 모비딕을 끝까지 쫓아갈까? vs 모비딕보다 다른 행복을 쫓는다? 당신의 선택은?', 
            date: '2025/10/01',
            author: 'aaa'
        },
        { 
            id: 4, type: '토론', 
            title: '데미안에서 나타나는 자아 발견의 의미가 너무 길어서 줄임표가 나타나야 합니다.', 
            relatedBook: '데미안', 
            content: '헤르만 헤세의 데미안에서 주인공의 성장 과정을 통해 자아를 발견하고 어쩌구 저쩌구 긴 내용입니다. 이 내용도 요약이 되어야 보기 좋겠지요? 네 그렇게 할 것입니다.', 
            date: '2025/11/10',
            author: 'bb'
        },
        { 
            id: 5, type: '퀴즈', 
            title: '1984 테스트: 빅 브라더는 무엇을 상징하는가?', 
            relatedBook: '1984', 
            content: '빅 브라더가 상징하는 것은 무엇일까요? 독재 정권? 감시 시스템? 아니면 현대인의 익명성?', 
            date: '2025/11/01',
            author: 'STARBOOKS 운영팀'
        },
        { 
            id: 6, type: '투표', 
            title: '내가 만약 모비딕이라면: 에이허브 선장을 피할까?', 
            relatedBook: '모비딕', 
            content: '나를 쫓는 모비딕을 끝까지 쫓아갈까? vs 모비딕보다 다른 행복을 쫓는다? 당신의 선택은?', 
            date: '2025/10/01',
            author: 'aaa'
        },
        { 
            id: 7, type: '토론', 
            title: '데미안에서 나타나는 자아 발견의 의미가 너무 길어서 줄임표가 나타나야 합니다.', 
            relatedBook: '데미안', 
            content: '헤르만 헤세의 데미안에서 주인공의 성장 과정을 통해 자아를 발견하고 어쩌구 저쩌구 긴 내용입니다. 이 내용도 요약이 되어야 보기 좋겠지요? 네 그렇게 할 것입니다.', 
            date: '2025/11/10',
            author: 'bb'
        },
        { 
            id: 8, type: '퀴즈', 
            title: '1984 테스트: 빅 브라더는 무엇을 상징하는가?', 
            relatedBook: '1984', 
            content: '빅 브라더가 상징하는 것은 무엇일까요? 독재 정권? 감시 시스템? 아니면 현대인의 익명성?', 
            date: '2025/11/01',
            author: 'STARBOOKS 운영팀'
        },
        { 
            id: 9, type: '투표', 
            title: '내가 만약 모비딕이라면: 에이허브 선장을 피할까?', 
            relatedBook: '모비딕', 
            content: '나를 쫓는 모비딕을 끝까지 쫓아갈까? vs 모비딕보다 다른 행복을 쫓는다? 당신의 선택은?', 
            date: '2025/10/01',
            author: 'aaa'
        },
        { 
            id: 10, type: '토론', 
            title: '데미안에서 나타나는 자아 발견의 의미가 너무 길어서 줄임표가 나타나야 합니다.', 
            relatedBook: '데미안', 
            content: '헤르만 헤세의 데미안에서 주인공의 성장 과정을 통해 자아를 발견하고 어쩌구 저쩌구 긴 내용입니다. 이 내용도 요약이 되어야 보기 좋겠지요? 네 그렇게 할 것입니다.', 
            date: '2025/11/10',
            author: 'bb'
        },
        { 
            id: 11, type: '퀴즈', 
            title: '1984 테스트: 빅 브라더는 무엇을 상징하는가?', 
            relatedBook: '1984', 
            content: '빅 브라더가 상징하는 것은 무엇일까요? 독재 정권? 감시 시스템? 아니면 현대인의 익명성?', 
            date: '2025/11/01',
            author: 'STARBOOKS 운영팀'
        },
        { 
            id: 12, type: '투표', 
            title: '내가 만약 모비딕이라면: 에이허브 선장을 피할까?', 
            relatedBook: '모비딕', 
            content: '나를 쫓는 모비딕을 끝까지 쫓아갈까? vs 모비딕보다 다른 행복을 쫓는다? 당신의 선택은?', 
            date: '2025/10/01',
            author: 'aaa'
        },

    ];

    //최신순
    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
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
                {selectedPosts.map(post => (
                    // id와 author를 PostCard에 전달
                    <PostCard key={post.id} {...post} />
                ))}
            </div>

            {posts.length > postsPerPage && (
                <div className="cl-pagination">
                    <button 
                        className="cl-page-btn"
                        onClick={() => {
                            if (startPage > 1) {
                                setCurrentPage(startPage - pagesPerGroup);
                            }
                        }}
                        disabled={startPage === 1}
                    >
                        ＜
                    </button>

                    {/* 그룹 내 페이지 번호 */}
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

                    {/* 다음 그룹으로 이동 */}
                    <button 
                        className="cl-page-btn"
                        onClick={() => {
                            if (endPage < totalPages) {
                                setCurrentPage(endPage + 1);
                            }
                        }}
                        disabled={endPage === totalPages}
                    >
                        ＞
                    </button>
                </div>
            )}

        </div>
    );
}