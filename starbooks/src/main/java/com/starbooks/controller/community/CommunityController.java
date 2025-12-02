package com.starbooks.controller.community;

import com.starbooks.domain.community.*;
import com.starbooks.domain.book.Book;
import com.starbooks.domain.user.User;
import com.starbooks.dto.community.*;
import com.starbooks.service.community.CommunityPostService;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community/posts")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityPostService service;
    private final UserRepository userRepo;
    private final BookRepository bookRepo;

    @PostMapping
    public ResponseEntity<CommunityPostResponseDto> create(@RequestBody CommunityPostRequestDto dto) {

        User user = userRepo.findById(dto.getUserId()).orElseThrow();
        Book book = dto.getBookId() != null ? bookRepo.findById(dto.getBookId()).orElse(null) : null;

        CommunityPost post = CommunityPost.builder()
                .user(user)
                .book(book)
                .postType(dto.getPostType())
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        CommunityPost saved = service.save(post);

        return ResponseEntity.ok(CommunityPostResponseDto.builder()
                .postId(saved.getPostId())
                .userId(saved.getUser().getUserId())
                .bookId(saved.getBook() != null ? saved.getBook().getBookId() : null)
                .postType(saved.getPostType())
                .title(saved.getTitle())
                .content(saved.getContent())
                .isPublished(saved.getIsPublished())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityPostResponseDto> get(@PathVariable Long id) {
        CommunityPost p = service.find(id);

        return ResponseEntity.ok(
                CommunityPostResponseDto.builder()
                        .postId(p.getPostId())
                        .userId(p.getUser().getUserId())
                        .bookId(p.getBook() != null ? p.getBook().getBookId() : null)
                        .postType(p.getPostType())
                        .title(p.getTitle())
                        .content(p.getContent())
                        .isPublished(p.getIsPublished())
                        .createdAt(p.getCreatedAt())
                        .updatedAt(p.getUpdatedAt())
                        .build()
        );
    }

    // community 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
