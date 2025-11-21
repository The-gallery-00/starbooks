package com.starbooks.domain.search;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="search_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searchId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private String keyword;

    private LocalDateTime searchedAt;
}
