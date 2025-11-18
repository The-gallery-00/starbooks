package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "reading_record")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class ReadingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    private String userId;

    private Long bookId;

    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String review;

    @Column(columnDefinition = "TEXT")
    private String favoriteQuote;

    @Column(length = 20)
    private String readingStatus;

    private Integer progressPercent;

    private LocalDate startDate;
    private LocalDate endDate;
}
