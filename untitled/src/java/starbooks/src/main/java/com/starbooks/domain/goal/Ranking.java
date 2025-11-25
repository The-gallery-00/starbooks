package java.starbooks.src.main.java.com.starbooks.domain.goal;

import jakarta.persistence.*;
import lombok.*;
import java.starbooks.src.main.java.com.starbooks.domain.user.User;


import java.time.LocalDateTime;

@Entity
@Table(name="rankings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankingId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private RankingType rankingType;

    private Integer rankPosition;
    private Integer value;

    private LocalDateTime calculatedAt;
}

