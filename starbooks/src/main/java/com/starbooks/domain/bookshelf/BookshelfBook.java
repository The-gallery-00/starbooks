package com.starbooks.domain.bookshelf;

import com.starbooks.domain.book.Book;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bookshelf_books")
public class BookshelfBook {

    @EmbeddedId
    private BookshelfBookId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("shelfId")
    @JoinColumn(name = "shelf_id")
    private Bookshelf bookshelf;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "added_at")
    private LocalDateTime addedAt = LocalDateTime.now();
}
