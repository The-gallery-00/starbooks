package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book_shelf_item")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class BookShelfItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "shelf_id")
    private BookShelf shelf;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
}
