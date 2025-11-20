package com.starbooks.domain.reading;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reading_records",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_user_book_record", columnNames = {"user_id", "book_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    @Column(nullable = false)
    private Long userId;   // FK (연관관계 대신 Long)

    @Column(nullable = false)
    private Long bookId;   // FK

    private Integer rating;

    @Lob
    private String review;

    @Lob
    private String favoriteQuote;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReadingStatus readingStatus;

    private Integer progressPercent;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

