package java.starbooks.src.main.java.com.starbooks.domain.shelf;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookshelfBookId implements Serializable {
    private Long bookshelf;
    private Long book;
}
