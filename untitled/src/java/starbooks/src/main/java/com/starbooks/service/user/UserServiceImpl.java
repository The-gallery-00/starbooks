package java.starbooks.src.main.java.com.starbooks.service.user;

import com.starbooks.domain.user.Role;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.user.UserRequest;
import com.starbooks.dto.user.UserResponse;
import java.starbooks.src.main.java.com.starbooks.exception.NotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // -----------------------
    // 1. 회원 생성
    // -----------------------
    @Override
    public UserResponse createUser(UserRequest request) {

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(request.getPassword())   // 암호화는 AuthService에서 처리
                .nickname(request.getNickname())
                .role(Role.USER)
                .isActive(true)
                .build();

        User saved = userRepository.save(user);

        return toResponse(saved);
    }

    // -----------------------
    // 2. ID로 조회
    // -----------------------
    @Override
    public UserResponse getUserById(Long id) {
        User user = getUserEntity(id);
        return toResponse(user);
    }

    // -----------------------
    // 3. username으로 조회
    // -----------------------
    @Override
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found: " + username));

        return toResponse(user);
    }

    // -----------------------
    // 4. 엔티티 반환 (내부용)
    // -----------------------
    @Override
    public User getUserEntity(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found: " + id));
    }

    // -----------------------
    // DTO 변환 메서드
    // -----------------------
    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .role(user.getRole().name())
                .isActive(user.getIsActive())
                .profileImage(user.getProfileImage())
                .intro(user.getIntro())
                .build();
    }
}
