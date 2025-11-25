import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.starbooks.domain.user.User;
import com.starbooks.repository.user.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankingServiceImpl implements RankingService {

    private final UserRepository userRepository;

    @Override
    public List<User> getTopReaders(int limit) {
        return userRepository.findTopReaders(limit);
    }
}
