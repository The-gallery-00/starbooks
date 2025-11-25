package com.starbooks.domain.ranking;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "rankings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ranking_id")
    private Long rankingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "ranking_type", nullable = false, length = 30)
    private RankingType rankingType;

    @Column(name = "rank_position", nullable = false)
    private Integer rankPosition;

    @Column(nullable = false)
    private Integer value;

    @Column(name = "calculated_at", nullable = false)
    private LocalDateTime calculatedAt;
}
