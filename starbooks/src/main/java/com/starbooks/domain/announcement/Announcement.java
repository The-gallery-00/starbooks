package com.starbooks.domain.announcement;

import jakarta.persistence.*;
import lombok.*;
import com.starbooks.domain.user.User;

import java.time.LocalDateTime;

@Entity
@Table(name="announcements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long announcementId;

    private String title;

    @Lob
    private String content;

    @ManyToOne
    @JoinColumn(name="author_id")
    private User author;

    private LocalDateTime createdAt;
}
