// com.starbooks.domain.community.CommunityPostRepository
package com.starbooks.domain.community;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByTitleContaining(String keyword);
}
