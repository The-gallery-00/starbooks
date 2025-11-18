package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ranking")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankingId;

    private String userId;

    @Column(length = 20)
    private String rankType; // pages, books, streak

    private Integer rankPosition;

    private Integer value; // the actual score (ex: number of books)
}
