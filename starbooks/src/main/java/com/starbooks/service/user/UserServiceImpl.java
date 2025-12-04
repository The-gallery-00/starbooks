// com.starbooks.service.user.UserServiceImpl.java
package com.starbooks.service.user;

import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User create(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User update(Long id, User updated) {
        User user = findById(id);
        user.setNickname(updated.getNickname());
        user.setIntro(updated.getIntro());
        user.setProfileImage(updated.getProfileImage());
        return userRepository.save(user);
    }

    @Override
    public User updateDailyPageGoal(Long userId, Integer goalPages) {
        User user = findById(userId); // 이미 있는 메서드 재사용
        user.setDailyPageGoal(goalPages);
        return userRepository.save(user);
    }

    @Override
    public void resetPasswordByUsername(String username, String newPassword) {
        User user = (User) userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("해당 아이디의 사용자를 찾을 수 없습니다."));

        user.setPasswordHash(newPassword); // 실무에서는 BCrypt 필수
        userRepository.save(user);
    }

    @Override
    public boolean resetPassword(String username, String email, String newPassword) {
        return false;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean isUsernameDuplicate(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean isEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}
