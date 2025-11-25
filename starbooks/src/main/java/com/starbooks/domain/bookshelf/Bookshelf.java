// com/starbooks/domain/bookshelf/Bookshelf.java
package com.starbooks.domain.bookshelf;

import com.starbooks.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookshelves",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_user_shelf",
                        columnNames = {"user_id", "shelf_type"})
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookshelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shelf_id")
    private Long shelfId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "shelf_type", nullable = false, length = 20)
    private ShelfType shelfType;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
