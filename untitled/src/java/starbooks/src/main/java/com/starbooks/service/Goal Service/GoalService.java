import com.starbooks.domain.goal.Goal;

public interface GoalService {
    Goal setMonthlyGoal(Long userId, int month, int targetBooks);
    Goal getMonthlyGoal(Long userId, int month);
}
