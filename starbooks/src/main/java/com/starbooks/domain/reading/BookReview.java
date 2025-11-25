package com.starbooks.domain.reading;

import jakarta.persistence.*;
import lombok.*;
import com.starbooks.domain.user.User;
import com.starbooks.domain.book.Book;

import java.time.LocalDateTime;

@Entity
@Table(name = "book_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="book_id")
    private Long bookId;

    private Integer rating;

    @Lob
    private String content;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
