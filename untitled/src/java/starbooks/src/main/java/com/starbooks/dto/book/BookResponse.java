package java.starbooks.src.main.java.com.starbooks.dto.book;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookResponse {

    private Long bookId;
    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private String category;
    private String description;
    private String coverImage;
    private String publishDate;

    private Double avgRating;
    private Integer reviewCount;
    private Boolean isPopular;
}
