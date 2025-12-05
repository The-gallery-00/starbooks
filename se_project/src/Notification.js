import React from 'react';
import './Notification.css';

const DUMMY_NOTIFICATIONS = [
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
];

const NotificationItem = ({ icon, message, date, type }) => {
  return (
    <div className="notification-item">
      <div className="notification-icon-wrapper alert-icon">
        {icon}
      </div>

      <div className="notification-message">
        <span className={`notification-type type-${type}`}>
          {type === 'friend_request'
            ? '친구 신청'
            : type === 'community'
            ? '커뮤니티'
            : '챌린지'}
        </span>
        <p className="message-text">{message}</p>
      </div>

      <span className="notification-date">{date}</span>
    </div>
  );
};

export default function Notification() {
  const alerts = DUMMY_NOTIFICATIONS;

  return (
    <div className="notification-container">
      <h2 className="section-title alert-title">알림</h2>

      <div className="alert-list">
        {alerts.map(item => (
          <NotificationItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
