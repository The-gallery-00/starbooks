package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "review")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String userId;

    private Long bookId;

    @Column(columnDefinition = "TEXT")
    private String reviewText;
}
