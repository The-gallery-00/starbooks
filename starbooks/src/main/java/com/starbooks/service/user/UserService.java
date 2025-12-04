// com.starbooks.service.user.UserService.java
package com.starbooks.service.user;

import com.starbooks.domain.user.User;

import java.util.List;

public interface UserService {
    User create(User user);
    User findById(Long id);
    List<User> findAll();
    User update(Long id, User user);
    void delete(Long id);

    boolean isUsernameDuplicate(String username);
    boolean isEmailDuplicate(String email);
    boolean isNicknameDuplicate(String nickname);
    User updateDailyPageGoal(Long userId, Integer goalPages);

    void resetPasswordByUsername(String username, String newPassword);

    // 아이디 + 이메일로 비밀번호 재설정 (우리가 사용할 핵심 기능)
    boolean resetPassword(String username, String email, String newPassword);
}
