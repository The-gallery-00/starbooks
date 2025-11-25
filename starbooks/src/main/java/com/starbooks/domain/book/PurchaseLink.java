// com/starbooks/domain/book/PurchaseLink.java
package com.starbooks.domain.book;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "purchase_links")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "link_id")
    private Long linkId;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "site_name", nullable = false, length = 80)
    private String siteName;

    @Column(nullable = false, length = 255)
    private String url;
}
