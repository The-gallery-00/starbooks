package com.starbooks.domain.search;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "search_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "search_id")
    private Long searchId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // nullable, ON DELETE SET NULL

    @Column(nullable = false, length = 120)
    private String keyword;

    @Column(name = "searched_at")
    private LocalDateTime searchedAt;
}
