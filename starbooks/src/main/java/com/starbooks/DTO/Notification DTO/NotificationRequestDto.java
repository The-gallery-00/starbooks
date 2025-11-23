package com.starbooks.domain.notification.dto;

import lombok.Getter;

@Getter
public class NotificationRequestDto {
    private Long userId;
    private String category;
    private String message;
}
