package com.starbooks.domain.notification;

public enum NotificationCategory {
    SYSTEM,
    FRIEND,
    CHALLENGE,
    COMMUNITY,

    FRIEND_REQUEST,        // 친구 요청 알림
    COMMENT_CREATED,       // 댓글 생성 알림
    CHALLENGE_CREATED,     // 챌린지 생성 알림
    COMMENT, CHALLENGE_CLOSED       // 챌린지 종료 알림
}
