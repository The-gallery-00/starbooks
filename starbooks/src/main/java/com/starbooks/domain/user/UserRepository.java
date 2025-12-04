package com.starbooks.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameAndEmail(String username, String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);


    List<User> findByNicknameContainingIgnoreCase(String keyword);

    Optional<Object> findByUsername(String username);

    Optional<Object> findByEmail(String loginId);
}
