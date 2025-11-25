// com/starbooks/domain/book/Book.java
package com.starbooks.domain.book;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "books",
        indexes = {
                @Index(name = "idx_books_title", columnList = "title"),
                @Index(name = "idx_books_category", columnList = "category")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long bookId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 120)
    private String author;

    @Column(length = 120)
    private String publisher;

    @Column(unique = true, length = 20)
    private String isbn;

    @Column(length = 80)
    private String category;

    @Lob
    private String description;

    @Column(name = "cover_image")
    private String coverImage;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @Column(name = "avg_rating", precision = 3, scale = 2)
    private BigDecimal avgRating;

    @Column(name = "review_count")
    private Integer reviewCount;

    @Column(name = "is_popular", columnDefinition = "TINYINT(1)")
    private Boolean isPopular;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
