package com.starbooks.controller.announcement;

import com.starbooks.domain.announcement.Announcement;
import com.starbooks.domain.user.User;
import com.starbooks.dto.announcement.*;
import com.starbooks.service.announcement.AnnouncementService;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService service;
    private final UserRepository userRepo;

    @PostMapping
    public ResponseEntity<AnnouncementResponseDto> create(@RequestBody AnnouncementRequestDto dto) {

        User author = userRepo.findById(dto.getAuthorId()).orElseThrow();

        Announcement a = Announcement.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .author(author)
                .build();

        Announcement saved = service.save(a);

        return ResponseEntity.ok(
                AnnouncementResponseDto.builder()
                        .announcementId(saved.getAnnouncementId())
                        .title(saved.getTitle())
                        .content(saved.getContent())
                        .authorId(saved.getAuthor().getUserId())
                        .createdAt(saved.getCreatedAt())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementResponseDto> get(@PathVariable Long id) {
        Announcement a = service.find(id);

        return ResponseEntity.ok(
                AnnouncementResponseDto.builder()
                        .announcementId(a.getAnnouncementId())
                        .title(a.getTitle())
                        .content(a.getContent())
                        .authorId(a.getAuthor().getUserId())
                        .createdAt(a.getCreatedAt())
                        .build()
        );
    }
}
