import React, { useEffect, useState, useContext } from "react";
import "./Notification.css";
import api from "./api/axiosInstance";
import { UserContext } from "./UserContext";

const categoryMap = {
  FRIEND_REQUEST: {
    type: "friend_request",
    label: "친구 신청",
    icon: "👤",
  },
  COMMENT_CREATED: {
    type: "community",
    label: "새 댓글",
    icon: "💬",
  },
  CHALLENGE_CREATED: {
    type: "challenge",
    label: "챌린지 생성",
    icon: "🏆",
  },
};

const NotificationItem = ({ icon, label, message, date, id, isRead, onRead }) => {
  return (
    <div
      className={`notification-item ${isRead ? "read" : "unread"}`}
      onClick={() => onRead(id)}
    >
      <div className="notification-icon-wrapper alert-icon">{icon}</div>

      <div className="notification-message">
        <span className="notification-type">{label}</span>
        <p className="message-text">{message}</p>
      </div>

      <span className="notification-date">{date}</span>
    </div>
  );
};

export default function Notification() {
  const { user } = useContext(UserContext);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.userId) {
      console.warn("유저 정보 없음 → 알림 로드 중단");
      return;
    }
    fetchNotifications();
  }, [user]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };


  const fetchNotifications = async () => {
    try {
      const response = await api.get(`/api/notifications/user/${user.userId}`);

      const formatted = response.data
        .filter((item) =>
          ["FRIEND_REQUEST", "COMMENT_CREATED", "CHALLENGE_CREATED"].includes(item.category)
        )
        .map((item) => {
          const map = categoryMap[item.category];

          return {
            id: item.notificationId,
            icon: map.icon,
            type: map.type,
            label: map.label,
            message: item.message,
            date: formatDate(item.createdAt),
            isRead: item.read,
          };
        });

      setAlerts(formatted);
    } catch (error) {
      console.error("알림 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await api.patch(`/api/notifications/${id}/read`);
      console.log("PATCH 응답:", response.status, response.data);

      setAlerts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error("읽음 처리 실패:", error);
      if (error.response) {
      console.error("서버 응답 오류:", error.response.status, error.response.data);
    }
    }
  };


  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="notification-container">
      <h2 className="section-title alert-title">알림</h2>

      <div className="alert-list">
        {alerts.length === 0 ? (
          <p className="no-alerts">알림이 없습니다.</p>
        ) : (
          alerts.map((item) => (
            <NotificationItem key={item.id} {...item} onRead={markAsRead} />
          ))
        )}
      </div>
    </div>
  );
}
