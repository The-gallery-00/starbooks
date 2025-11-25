package com.starbooks.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    // 필요하면 이런 메소드도 나중에 추가 가능
    // Optional<UserProfile> findByUser(User user);
}
