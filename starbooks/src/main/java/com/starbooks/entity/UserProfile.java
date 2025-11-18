package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_profile")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class UserProfile {

    @Id
    private String userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 300)
    private String introduction;

    @Column(length = 200)
    private String favoriteAuthors;

    @Column(length = 200)
    private String favoriteGenres;
}
