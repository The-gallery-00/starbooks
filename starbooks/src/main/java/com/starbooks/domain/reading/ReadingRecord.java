package com.starbooks.domain.reading;

import jakarta.persistence.*;
import lombok.*;
import com.starbooks.domain.user.User;

import java.sql.Date;
import java.sql.Timestamp;

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

    @Column(name="book_id")
    private Long bookId;

    private Integer rating;

    @Lob
    private String review;

    @Lob
    private String favoriteQuote;

    @Enumerated(EnumType.STRING)
    private ReadingStatus readingStatus;

    private Integer progressPercent;

    @Column(name="start_date")
    private Date startDate;

    @Column(name="end_date")
    private Date endDate;

    @Column(name="created_at")
    private Timestamp createdAt;   // LocalDateTime → Timestamp

    @Column(name="updated_at")
    private Timestamp updatedAt;   // LocalDateTime → Timestamp
}
