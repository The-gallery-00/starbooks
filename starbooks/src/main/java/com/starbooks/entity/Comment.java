package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private Long postId;

    private String userId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;
}
