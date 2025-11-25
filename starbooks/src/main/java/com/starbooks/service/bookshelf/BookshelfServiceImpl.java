// com.starbooks.service.bookshelf.BookshelfServiceImpl.java
package com.starbooks.service.bookshelf;

import com.starbooks.domain.bookshelf.Bookshelf;
import com.starbooks.domain.bookshelf.BookshelfRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookshelfServiceImpl implements BookshelfService {

    private final BookshelfRepository repository;

    @Override
    public Bookshelf create(Bookshelf shelf) {
        return repository.save(shelf);
    }

    @Override
    public Bookshelf findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
