package com.starbooks.domain.goal;

import jakarta.persistence.*;
import lombok.*;
import com.starbooks.domain.user.User;


import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private GoalType goalType;

    private Integer targetBooks;
    private Integer targetPages;
    private Integer achievedBooks;

    private LocalDate startDate;
    private LocalDate endDate;

    private LocalDateTime lastUpdated;
}
