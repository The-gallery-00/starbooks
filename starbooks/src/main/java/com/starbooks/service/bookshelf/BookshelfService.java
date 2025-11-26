// com.starbooks.service.bookshelf.BookshelfService.java
package com.starbooks.service.bookshelf;

import com.starbooks.domain.bookshelf.Bookshelf;

public interface BookshelfService {
    Bookshelf create(Bookshelf shelf);
    Bookshelf findById(Long id);
    void delete(Long id);

    BookshelfBook addBook(Long shelfId, Long bookId);
}

