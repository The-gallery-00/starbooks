package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rating")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;

    private String userId;

    private Long bookId;

    private Integer rating;
}
