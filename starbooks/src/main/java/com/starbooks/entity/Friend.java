package com.starbooks.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "friend")
@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;

    private String userId;

    private String friendUserId;
}
