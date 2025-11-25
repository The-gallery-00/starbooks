package com.starbooks.domain.goal;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "goals",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_user_goal_period",
                        columnNames = {"user_id", "goal_type", "start_date"})
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Long goalId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "goal_type", nullable = false, length = 20)
    private GoalType goalType;

    @Column(name = "target_books")
    private Integer targetBooks;

    @Column(name = "target_pages")
    private Integer targetPages;

    @Column(name = "achieved_books")
    private Integer achievedBooks;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}
