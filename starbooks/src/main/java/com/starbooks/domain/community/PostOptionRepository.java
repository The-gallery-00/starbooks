// com.starbooks.domain.community.PostOptionRepository
package com.starbooks.domain.community;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostOptionRepository extends JpaRepository<PostOption, Long> {
    List<PostOption> findByPost(CommunityPost post);
}
