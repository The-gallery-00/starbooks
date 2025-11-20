import jakarta.persistence.*;
import lombok.*;

import java.awt.print.Book;

@Entity
@Table(name = "purchase_links")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long linkId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private String siteName;
    private String url;
}
