package com.starbooks.controller.community;

import com.starbooks.domain.community.*;
import com.starbooks.domain.user.User;
import com.starbooks.dto.community.*;
import com.starbooks.service.community.CommentService;
import com.starbooks.service.community.CommunityPostService;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community/posts")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityPostService service;
    private final UserRepository userRepo;
    private final CommentService commentService;

    /** 📌 일반 게시글 (DISCUSSION) 작성 */
    @PostMapping("/discussion")
    public ResponseEntity<CommunityPostResponseDto> createDiscussion(@RequestBody CommunityPostRequestDto dto) {

        User user = userRepo.findByUsername(dto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        CommunityPost post = CommunityPost.builder()
                .user(user)
                .bookTitle(dto.getBookTitle()) // 수정됨!
                .postType(PostType.DISCUSSION)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        CommunityPost saved = service.save(post);

        return ResponseEntity.ok(CommunityPostResponseDto.from(saved));
    }

    /** 📌 퀴즈 & 투표 (선택지 포함) 생성 */
    @PostMapping("/poll-or-quiz")
    public ResponseEntity<CommunityPostResponseDto> createQuizOrPoll(@RequestBody QuizPollRequestDto dto) {

        CommunityPostRequestDto postDto = dto.getPost();

        User user = userRepo.findByUsername(postDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        CommunityPost post = CommunityPost.builder()
                .user(user)
                .bookTitle(postDto.getBookTitle())
                .postType(postDto.getPostType()) // QUIZ or POLL 둘 중 하나
                .title(postDto.getTitle())
                .content(postDto.getContent()) // 질문 내용
                .build();

        List<PostOption> options = dto.getOptions().stream()
                .map(o -> PostOption.builder()
                        .post(post)
                        .optionText(o.getOptionText())
                        .isCorrect(o.getIsCorrect())
                        .optionOrder(o.getOptionOrder())
                        .build())
                .toList();

        CommunityPost saved = service.saveWithOptions(post, options);

        return ResponseEntity.ok(CommunityPostResponseDto.from(saved));
    }

    /** 📌 전체 게시글 조회 */
    @GetMapping
    public ResponseEntity<List<CommunityPostResponseDto>> listAll() {
        return ResponseEntity.ok(
                service.findAll().stream()
                        .map(CommunityPostResponseDto::from)
                        .toList()
        );
    }

    /** 📌 개별 게시글 조회 */
    @GetMapping("/{postId}")
    public ResponseEntity<CommunityPostResponseDto> get(@PathVariable Long postId) {
        return ResponseEntity.ok(
                CommunityPostResponseDto.from(service.find(postId))
        );
    }

    /** 📌 게시글 삭제 */
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> delete(@PathVariable Long postId) {
        service.delete(postId);
        return ResponseEntity.ok().build();
    }

    /** 댓글 */
    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentResponseDto> addComment(
            @PathVariable Long postId,
            @RequestBody CommentRequestDto dto
    ) {
        dto.setPostId(postId);
        return ResponseEntity.ok(commentService.addComment(dto));
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }


}
