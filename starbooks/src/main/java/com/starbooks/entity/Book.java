package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "books")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(length = 100)
    private String publisher;

    @Column(length = 20)
    private String isbn;

    private LocalDate publishDate;

    @Column(length = 255)
    private String coverImage;

    @Column(columnDefinition = "TEXT")
    private String description;
}
