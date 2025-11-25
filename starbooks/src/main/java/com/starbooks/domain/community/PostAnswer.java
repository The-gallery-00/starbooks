// com/starbooks/domain/community/PostAnswer.java
package com.starbooks.domain.community;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_answers",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_post_user",
                        columnNames = {"post_id", "user_id"})
        },
        indexes = {
                @Index(name = "idx_post_answers_post_user", columnList = "post_id, user_id")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long answerId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private CommunityPost post;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "option_id", nullable = false)
    private PostOption option;

    @Column(name = "answered_at")
    private LocalDateTime answeredAt;
}
