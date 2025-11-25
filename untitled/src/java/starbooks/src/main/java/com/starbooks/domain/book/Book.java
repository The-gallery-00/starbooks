package java.starbooks.src.main.java.com.starbooks.domain.book;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private String category;

    @Lob
    private String description;

    private String coverImage;

    private LocalDate publishDate;

    private Double avgRating;

    private Integer reviewCount;

    private Boolean isPopular;
}
