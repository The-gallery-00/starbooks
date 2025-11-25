package java.starbooks.src.main.java.com.starbooks.dto.shelf;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookshelfBookResponse {

    private Long shelfId;
    private Long bookId;
    private String addedAt;
}
