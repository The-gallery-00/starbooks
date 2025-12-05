package com.starbooks.domain.bookshelf;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.reading.ReadingStatus;
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

    @ManyToOne
    @MapsId("shelfId")
    @JoinColumn(name = "shelf_id")
    private Bookshelf bookshelf;

    @ManyToOne
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ReadingStatus status; // 📌 READING / FINISHED / WISHLIST 등등

    @Column(name = "read_pages")
    private Integer currentPage; // 읽은 페이지

    @Column(name = "total_page")
    private Integer totalPage; // 책 총 페이지

    @Column(name = "progress")
    private Integer progress; // 퍼센트(0~100)

    @Column(name = "added_at")
    private LocalDateTime addedAt;
}
