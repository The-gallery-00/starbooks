// src/main/java/com/starbooks/dto/announcement/AnnouncementRequestDto.java
package com.starbooks.dto.announcement;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnnouncementRequestDto {

    private String title;
    private String content;
    private Long authorId;
}
