package com.starbooks.service.user;

import com.starbooks.dto.user.UserProfileRequest;
import com.starbooks.dto.user.UserProfileResponse;

public interface UserProfileService {

    // 특정 유저의 프로필 조회
    UserProfileResponse getProfile(Long userId);

    // 특정 유저의 프로필 생성 또는 업데이트 (upsert)
    UserProfileResponse upsertProfile(Long userId, UserProfileRequest request);
}
