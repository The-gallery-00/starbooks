package com.starbooks.domain.reading;

import jakarta.persistence.*;
import lombok.*;
import com.starbooks.domain.user.User;
import com.starbooks.domain.book.Book;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reading_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;

    private Integer rating;

    @Lob
    private String review;

    @Lob
    private String favoriteQuote;

    @Enumerated(EnumType.STRING)
    private ReadingStatus readingStatus;

    private Integer progressPercent;

    private LocalDate startDate;
    private LocalDate endDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
