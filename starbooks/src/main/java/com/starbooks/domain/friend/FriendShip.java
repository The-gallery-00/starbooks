// com/starbooks/domain/friend/Friendship.java
package com.starbooks.domain.friend;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "friends"
// DB에서는
// CONSTRAINT uq_friend_pair UNIQUE ( LEAST(requester_id, receiver_id), GREATEST(requester_id, receiver_id) )
// 로 잡혀있는데, JPA에서 함수 기반 UNIQUE는 매핑이 안 되므로
// 여기서는 생략하고 서비스 레벨/쿼리로 검증하는 걸 추천
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friendship_id")
    private Long friendshipId;

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private FriendshipStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
