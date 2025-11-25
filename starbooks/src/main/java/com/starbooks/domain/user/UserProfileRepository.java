// com.starbooks.domain.user.UserProfileRepository
package com.starbooks.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
}
