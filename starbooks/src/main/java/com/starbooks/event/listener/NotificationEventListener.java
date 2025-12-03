// com.starbooks.event.listener.NotificationEventListener
package com.starbooks.event.listener;

import com.starbooks.domain.notification.Notification;
import com.starbooks.domain.notification.NotificationCategory;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.event.challenge.ChallengeCreatedEvent;
import com.starbooks.event.challenge.ChallengeClosedEvent;
import com.starbooks.event.friend.FriendRequestEvent;
import com.starbooks.event.community.CommentCreatedEvent;
import com.starbooks.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @EventListener
    public void onChallengeCreated(ChallengeCreatedEvent event) {
        User user = userRepository.findById(event.userId()).orElseThrow();
        notificationService.save(
                Notification.builder()
                        .user(user)
                        .category(NotificationCategory.CHALLENGE_CREATED)
                        .message("새로운 챌린지가 생성되었습니다.")
                        .isRead(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    @EventListener
    public void onChallengeClosed(ChallengeClosedEvent event) {
        User user = userRepository.findById(event.userId()).orElseThrow();
        notificationService.save(
                Notification.builder()
                        .user(user)
                        .category(NotificationCategory.CHALLENGE_CLOSED)
                        .message("참여 중인 챌린지가 종료되었습니다.")
                        .isRead(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    @EventListener
    public void onFriendRequest(FriendRequestEvent event) {
        User toUser = userRepository.findById(event.toUserId()).orElseThrow();
        User fromUser = userRepository.findById(event.fromUserId()).orElseThrow();

        notificationService.save(
                Notification.builder()
                        .user(toUser)
                        .category(NotificationCategory.FRIEND_REQUEST)
                        .message(fromUser.getUsername() + "님이 친구 요청을 보냈습니다.")
                        .isRead(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    @EventListener
    public void onCommentCreated(CommentCreatedEvent event) {
        User postOwner = userRepository.findById(event.postOwnerId()).orElseThrow();
        User commenter = userRepository.findById(event.commenterId()).orElseThrow();

        notificationService.save(
                Notification.builder()
                        .user(postOwner)
                        .category(NotificationCategory.COMMENT)
                        .message(commenter.getUsername() + "님이 게시물에 댓글을 남겼습니다.")
                        .isRead(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }
}
