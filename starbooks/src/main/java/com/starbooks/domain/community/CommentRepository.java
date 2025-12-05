// com.starbooks.domain.community.CommentRepository
package com.starbooks.domain.community;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostPostIdOrderByCreatedAtAsc(Long postId);
}
