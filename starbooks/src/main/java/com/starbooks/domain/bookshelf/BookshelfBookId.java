// com/starbooks/domain/bookshelf/BookshelfBookId.java
package com.starbooks.domain.bookshelf;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookshelfBookId implements Serializable {

    @Column(name = "shelf_id")
    private Long shelfId;

    @Column(name = "book_id")
    private Long bookId;
}
