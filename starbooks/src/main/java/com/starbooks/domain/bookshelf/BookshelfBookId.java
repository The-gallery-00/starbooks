package com.starbooks.domain.bookshelf;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class BookshelfBookId implements Serializable {

    private Long shelfId;
    private Long bookId;
}
