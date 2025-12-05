// com.starbooks.domain.bookshelf.BookshelfRepository
package com.starbooks.domain.bookshelf;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookshelfRepository extends JpaRepository<Bookshelf, Long> {

    // ✅ user_id + shelf_type 으로 한 줄 찾기
    Optional<Bookshelf> findByUserUserIdAndShelfType(Long userId, ShelfType shelfType);
}
