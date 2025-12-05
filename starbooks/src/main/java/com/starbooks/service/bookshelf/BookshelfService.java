// com.starbooks.service.bookshelf.BookshelfService.java
package com.starbooks.service.bookshelf;

import com.starbooks.domain.bookshelf.Bookshelf;
import com.starbooks.domain.bookshelf.BookshelfBook;
import com.starbooks.dto.bookshelf.BookshelfRequestDto;

public interface BookshelfService {

    Bookshelf create(Bookshelf shelf);

    Bookshelf findById(Long id);

    void delete(Long id);

    // ✅ 핵심: 책을 서재에 추가
    BookshelfBook addBookToShelf(BookshelfRequestDto dto);
}
