package com.starbooks.service.user;

import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserProfile;
import com.starbooks.domain.user.UserProfileRepository;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.user.UserProfileRequest;
import com.starbooks.dto.user.UserProfileResponse;
import com.starbooks.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    // -----------------------
    // 1. 프로필 조회
    // -----------------------
    @Override
    public UserProfileResponse getProfile(Long userId) {

        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User profile not found: " + userId));

        return toResponse(profile);
    }

    // -----------------------
    // 2. 프로필 생성/수정 (Upsert)
    // -----------------------
    @Override
    public UserProfileResponse upsertProfile(Long userId, UserProfileRequest request) {

        // 1) 유저 존재 여부 체크
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found: " + userId));

        // 2) 기존 프로필이 있으면 가져오고, 없으면 새로 생성
        UserProfile profile = userProfileRepository.findById(userId)
                .orElse(UserProfile.builder()
                        .user(user)
                        .build()
                );

        // 3) 값 세팅
        profile.setFavoriteAuthors(request.getFavoriteAuthors());
        profile.setFavoriteGenres(request.getFavoriteGenres());

        // 4) 저장
        UserProfile saved = userProfileRepository.save(profile);

        return toResponse(saved);
    }

    // -----------------------
    // 엔티티 → DTO 변환
    // -----------------------
    private UserProfileResponse toResponse(UserProfile profile) {
        return UserProfileResponse.builder()
                .userId(profile.getUserId())
                .favoriteAuthors(profile.getFavoriteAuthors())
                .favoriteGenres(profile.getFavoriteGenres())
                .build();
    }
}
