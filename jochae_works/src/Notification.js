import React from 'react';
import './Notification.css';

// ===========================================
// 더미 데이터
// ===========================================
const DUMMY_NOTIFICATIONS = [
  // 공지사항
  {
    id: 1,
    type: 'notice',
    icon: '🗣️',
    message: '새로운 기능을 확인해보세요!',
    date: '2025/11/12 16:00',
  },
  // 알림 목록
  {
    id: 2,
    type: 'friend_request',
    icon: '👤',
    message: 'AAA님이 친구 신청을 요청하였습니다.',
    date: '2025/11/11 15:15',
  },
  {
    id: 3,
    type: 'community',
    icon: '💬',
    message: '회원님이 게시한 글에 새 댓글이 작성되었습니다.',
    date: '2025/11/10 15:05',
  },
  {
    id: 4,
    type: 'challenge',
    icon: '🏆',
    message: "'10월 독서 마라톤' 챌린지에 참여하였습니다.",
    date: '2025/10/10 13:05',
  },
  {
    id: 5,
    type: 'ranking',
    icon: '🥇',
    message: '다독 랭킹 1위에 달성하였습니다.',
    date: '2025/10/05 13:05',
  },
  {
    id: 6,
    type: 'friend_request',
    icon: '👤',
    message: 'BBB님이 친구 신청을 요청하였습니다.',
    date: '2025/11/11 15:15',
  },
  {
    id: 7,
    type: 'community',
    icon: '💬',
    message: '회원님이 게시한 글에 새 댓글이 작성되었습니다.',
    date: '2025/11/10 15:05',
  },
  {
    id: 8,
    type: 'challenge',
    icon: '🏆',
    message: "'10월 독서 마라톤' 챌린지에 참여하였습니다.",
    date: '2025/10/10 13:05',
  },
  {
    id: 9,
    type: 'ranking',
    icon: '🥇',
    message: '다독 랭킹 1위에 달성하였습니다.',
    date: '2025/10/05 13:05',
  },
];

// 개별 알림 항목 컴포넌트
const NotificationItem = ({ icon, message, date, type }) => {
  return (
    <div className="notification-item">
      {/* 알림 유형별 아이콘 영역 (공지사항은 아이콘이 없지만, 알림과 통일성을 위해 type이 notice일 때만 큰 아이콘 사용) */}
      <div className={`notification-icon-wrapper ${type === 'notice' ? 'notice-icon' : 'alert-icon'}`}>
        {icon}
      </div>
      
      {/* 메시지 내용 */}
      <div className="notification-message">
        {type !== 'notice' && (
          // 알림 목록의 경우에만 유형 텍스트 표시
          <span className={`notification-type type-${type}`}>{type === 'friend_request' ? '친구 신청' : type === 'community' ? '커뮤니티' : type === 'challenge' ? '챌린지' : '랭킹'}</span>
        )}
        <p className="message-text">{message}</p>
      </div>

      {/* 날짜/시간 */}
      <span className="notification-date">{date}</span>
    </div>
  );
};


export default function Notification() {
  // 공지사항과 일반 알림 분리
  const notices = DUMMY_NOTIFICATIONS.filter(n => n.type === 'notice');
  const alerts = DUMMY_NOTIFICATIONS.filter(n => n.type !== 'notice');

  return (
    <div className="notification-container">
      {/* 1. 공지사항 섹션 */}
      <h2 className="section-title">공지사항</h2>
      <div className="notice-list">
        {notices.map(item => (
          <NotificationItem key={item.id} {...item} />
        ))}
      </div>

      {/* 2. 알림 섹션 */}
      <h2 className="section-title alert-title">알림</h2>
      <div className="alert-list">
        {alerts.map(item => (
          <NotificationItem key={item.id} {...item} />
        ))}
      </div>
      
      {/* 위로 스크롤 버튼 (이미지 하단 우측 화살표) */}
      <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </button>
    </div>
  );
}