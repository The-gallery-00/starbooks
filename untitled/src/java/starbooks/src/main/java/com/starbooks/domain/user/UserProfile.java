package java.starbooks.src.main.java.com.starbooks.domain.user;

import com.starbooks.domain.user.User;
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
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Lob
    private String favoriteAuthors;

    @Lob
    private String favoriteGenres;
}
