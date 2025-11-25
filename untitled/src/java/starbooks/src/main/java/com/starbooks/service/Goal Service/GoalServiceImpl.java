import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.starbooks.domain.goal.Goal;
import com.starbooks.repository.goal.GoalRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;

    @Override
    public Goal setMonthlyGoal(Long userId, int month, int targetBooks) {
        Goal goal = goalRepository.findByUserIdAndMonth(userId, month)
                .orElse(new Goal(userId, month, targetBooks));
        
        goal.setTargetBooks(targetBooks);
        return goalRepository.save(goal);
    }

    @Override
    @Transactional(readOnly = true)
    public Goal getMonthlyGoal(Long userId, int month) {
        return goalRepository.findByUserIdAndMonth(userId, month)
                .orElse(null);
    }
}
