package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "challenge")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer targetBooks;

    private LocalDate startDate;
    private LocalDate endDate;

    private String creatorId;
}
