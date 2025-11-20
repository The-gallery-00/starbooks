import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;

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
