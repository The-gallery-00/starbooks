// src/main/java/com/starbooks/dto/announcement/AnnouncementResponseDto.java
package com.starbooks.dto.announcement;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnnouncementResponseDto {

    private Long announcementId;
    private String title;
    private String content;
    private Long authorId;
    private LocalDateTime createdAt;
}
