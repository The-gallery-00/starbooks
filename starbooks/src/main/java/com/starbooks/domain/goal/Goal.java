package com.starbooks.domain.goal;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private GoalType goalType;

    private Integer targetCount;  // 목표: 책 몇 권 / 몇 페이지 등
    private Integer currentCount; // 진행상황

    private LocalDate startDate;
    private LocalDate endDate;

    private Boolean isCompleted;
}
