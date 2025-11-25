// com.starbooks.domain.community.CommentRepository
package com.starbooks.domain.community;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
