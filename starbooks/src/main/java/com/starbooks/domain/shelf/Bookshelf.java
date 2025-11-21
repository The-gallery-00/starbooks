package  com.starbooks.domain.shelf;

import com.starbooks.domain.shelf.ShelfType;
import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookshelves")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookshelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shelfId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private ShelfType shelfType;

    private LocalDateTime createdAt;
}
