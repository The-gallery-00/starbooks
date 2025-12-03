package com.starbooks.domain.reading;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reading_records",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_user_book_record",
                        columnNames = {"user_id", "book_id"})
        },
        indexes = {
                @Index(name = "idx_records_user", columnList = "user_id"),
                @Index(name = "idx_records_book", columnList = "book_id")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long recordId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    private Integer rating;          // TINYINT

    @Lob
    private String review;

    @Lob
    @Column(name = "favorite_quote")
    private String favoriteQuote;

    @Enumerated(EnumType.STRING)
    @Column(name = "reading_status", nullable = false, length = 20)
    private ReadingStatus readingStatus;

    @Column(name = "progress_percent")
    private Integer progressPercent;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "current_page")
    private Integer currentPage;

}
