package com.starbooks.service.community;

import com.starbooks.domain.community.CommunityPost;
import com.starbooks.domain.community.CommunityPostRepository;
import com.starbooks.domain.community.PostType;
import com.starbooks.domain.reading.ReadingRecordRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.community.CommunityPostRequest;
import com.starbooks.dto.community.CommunityPostResponse;
import com.starbooks.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityPostServiceImpl implements CommunityPostService {

    private final CommunityPostRepository postRepository;
    private final UserRepository userRepository;
    private final ReadingRecordRepository readingRecordRepository;

    // -------------------------------------
    // 1. 게시글 생성 (완독 여부 확인 포함)
    // -------------------------------------
    @Override
    public CommunityPostResponse createPost(Long userId, CommunityPostRequest request) {

        // 사용자 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        // 책에 대한 게시글이라면 완독 여부 체크
        if (request.getBookId() != null) {
            boolean finished = readingRecordRepository.findByUserIdAndBookId(userId, request.getBookId())
                    .map(r -> r.getReadingStatus().name().equals("FINISHED"))
                    .orElse(false);

            if (!finished) {
                throw new IllegalArgumentException("You must finish the book before posting!");
            }
        }

        CommunityPost post = CommunityPost.builder()
                .user(user)
                .bookId(request.getBookId())
                .postType(PostType.valueOf(request.getPostType()))
                .title(request.getTitle())
                .content(request.getContent())
                .isPublished(true)
                .build();

        CommunityPost saved = postRepository.save(post);

        return toResponse(saved);
    }

    // -------------------------------------
    // 2. 게시글 단건 조회
    // -------------------------------------
    @Override
    public CommunityPostResponse getPost(Long postId) {

        CommunityPost post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found"));

        return toResponse(post);
    }

    // -------------------------------------
    // 3. 특정 책 게시글 목록 조회
    // -------------------------------------
    @Override
    public List<CommunityPostResponse> getPostsByBook(Long bookId) {

        return postRepository.findByBookId(bookId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -------------------------------------
    // 4. 전체 게시글 조회
    // -------------------------------------
    @Override
    public List<CommunityPostResponse> getAllPosts() {

        return postRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -------------------------------------
    // 5. 게시글 삭제 (작성자만 가능)
    // -------------------------------------
    @Override
    public void deletePost(Long userId, Long postId) {

        CommunityPost post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found"));

        if (!post.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("No permission to delete this post");
        }

        postRepository.delete(post);
    }

    // -------------------------------------
    // Entity → DTO 변환
    // -------------------------------------
    private CommunityPostResponse toResponse(CommunityPost p) {
        return CommunityPostResponse.builder()
                .postId(p.getPostId())
                .userId(p.getUser().getUserId())
                .bookId(p.getBookId())
                .postType(p.getPostType().name())
                .title(p.getTitle())
                .content(p.getContent())
                .isPublished(p.getIsPublished())
                .createdAt(p.getCreatedAt().toString())
                .updatedAt(p.getUpdatedAt().toString())
                .build();
    }
}
