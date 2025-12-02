package com.starbooks.domain.favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByUserUserIdAndBookBookId(Long userId, Long bookId);

    Optional<Favorite> findByUserUserIdAndBookBookId(Long userId, Long bookId);

    List<Favorite> findByUserUserId(Long userId);
}
