package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book_shelf")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class BookShelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shelfId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, length = 20)
    private String shelfType; // reading, finished, liked, wish, etc.
}
