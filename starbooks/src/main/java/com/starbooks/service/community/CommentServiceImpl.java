// com.starbooks.service.community.CommentServiceImpl
package com.starbooks.service.community;

import com.starbooks.domain.community.*;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.community.CommentRequestDto;
import com.starbooks.dto.community.CommentResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepo;
    private final CommunityPostRepository postRepo;
    private final UserRepository userRepo;

    @Override
    public CommentResponseDto addComment(CommentRequestDto dto) {
        CommunityPost post = postRepo.findById(dto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));
        var user = userRepo.findByUsername(dto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(dto.getContent())
                .createdAt(ZonedDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Comment saved = commentRepo.save(comment);

        return CommentResponseDto.builder()
                .commentId(saved.getCommentId())
                .postId(post.getPostId())
                .username(user.getUsername())
                .content(saved.getContent())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    @Override
    public List<CommentResponseDto> getComments(Long postId) {
        return commentRepo.findByPostPostIdOrderByCreatedAtAsc(postId)
                .stream()
                .map(c -> CommentResponseDto.builder()
                        .commentId(c.getCommentId())
                        .postId(postId)
                        .userId(c.getUser().getUserId())
                        .username(c.getUser().getUsername())
                        .content(c.getContent())
                        .createdAt(c.getCreatedAt())
                        .updatedAt(c.getUpdatedAt())
                        .build()
                ).toList();
    }
}
