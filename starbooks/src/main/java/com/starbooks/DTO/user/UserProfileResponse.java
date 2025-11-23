package com.starbooks.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    private Long userId;
    private String favoriteAuthors;
    private String favoriteGenres;
}
