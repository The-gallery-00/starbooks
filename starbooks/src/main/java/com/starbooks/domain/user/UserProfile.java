// com/starbooks/domain/user/UserProfile.java
package com.starbooks.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @Column(name = "user_id")
    private Long userId;   // PK = FK (users.user_id)

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Lob
    @Column(name = "favorite_authors")
    private String favoriteAuthors;

    @Lob
    @Column(name = "favorite_genres")
    private String favoriteGenres;
}
