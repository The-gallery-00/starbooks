package java.starbooks.src.main.java.com.starbooks.domain.challenge;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "challenges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId;

    private String title;

    @Lob
    private String description;

    @Column(name = "start_date")
    private Date startDate;   // ← DB DATE와 일치

    @Column(name = "end_date")
    private Date endDate;     // ← DB DATE와 일치

    @Enumerated(EnumType.STRING)
    private ChallengeStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private User creator;

    @Column(name = "target_books")
    private Integer targetBooks;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;   // ← DB DATETIME과 일치

    @PrePersist
    public void prePersist() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
