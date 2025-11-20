package com.starbooks.domain.goal;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ranking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private RankingType rankingType;

    private Integer score; // 예: 이번달 읽은 책 수, 시간 등
}
