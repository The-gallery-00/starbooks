package java.starbooks.src.main.java.com.starbooks.service.user;

import com.starbooks.dto.user.UserRequest;
import com.starbooks.dto.user.UserResponse;
import com.starbooks.domain.user.User;

public interface UserService {

    UserResponse createUser(UserRequest request);

    UserResponse getUserById(Long id);

    UserResponse getUserByUsername(String username);

    User getUserEntity(Long id); // 내부에서 사용할 엔티티 반환용
}
