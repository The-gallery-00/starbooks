// com/starbooks/domain/community/PostOption.java
package com.starbooks.domain.community;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post_options",
        indexes = {
                @Index(name = "idx_post_options_post_id", columnList = "post_id")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long optionId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private CommunityPost post;

    @Column(name = "option_text", nullable = false, length = 255)
    private String optionText;

    @Column(name = "is_correct", columnDefinition = "TINYINT(1)")
    private Boolean isCorrect;

    @Column(name = "option_order")
    private Integer optionOrder;
}
