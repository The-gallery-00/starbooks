package com.starbooks.service.community;

import com.starbooks.domain.community.Comment;
import com.starbooks.domain.community.CommentRepository;
import com.starbooks.domain.community.CommunityPost;
import com.starbooks.domain.community.CommunityPostRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.community.CommentRequest;
import com.starbooks.dto.community.CommentResponse;
import com.starbooks.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommunityPostRepository postRepository;
    private final UserRepository userRepository;

    // -------------------------------------
    // 1. 댓글 작성
    // -------------------------------------
    @Override
    public CommentResponse addComment(Long userId, CommentRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        CommunityPost post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new NotFoundException("Post not found"));

        Comment comment = Comment.builder()
                .user(user)
                .post(post)
                .content(request.getContent())
                .build();

        Comment saved = commentRepository.save(comment);

        return toResponse(saved);
    }

    // -------------------------------------
    // 2. 댓글 목록 조회
    // -------------------------------------
    @Override
    public List<CommentResponse> getComments(Long postId) {

        return commentRepository.findByPostPostId(postId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -------------------------------------
    // 3. 댓글 삭제 (작성자만 가능)
    // -------------------------------------
    @Override
    public void deleteComment(Long userId, Long commentId) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found"));

        if (!comment.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("No permission to delete comment");
        }

        commentRepository.delete(comment);
    }

    private CommentResponse toResponse(Comment c) {
        return CommentResponse.builder()
                .commentId(c.getCommentId())
                .postId(c.getPost().getPostId())
                .userId(c.getUser().getUserId())
                .content(c.getContent())
                .createdAt(c.getCreatedAt().toString())
                .updatedAt(c.getUpdatedAt().toString())
                .build();
    }
}
