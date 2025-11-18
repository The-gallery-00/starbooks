package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "goal")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    private String userId;

    private Integer targetBooks;

    private Integer achievedBooks;

    private LocalDate startDate;
    private LocalDate endDate;
}
