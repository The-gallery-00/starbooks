package com.starbooks.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserProfileRequest {

    // JSON 형태의 문자열로 보내거나 저장한다고 가정
    // 예: '["Murakami","Tolkien"]'
    private String favoriteAuthors;

    // 예: '["Fantasy","Essay"]'
    private String favoriteGenres;
}
