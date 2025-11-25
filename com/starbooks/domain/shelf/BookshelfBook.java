package  com.starbooks.domain.shelf;


import com.starbooks.domain.book.Book;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookshelf_books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(BookshelfBookId.class)
public class BookshelfBook {

    @Id
    @ManyToOne
    @JoinColumn(name = "shelf_id")
    private Bookshelf bookshelf;

    @Id
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private LocalDateTime addedAt;
}
