// com.starbooks.service.goal.GoalService.java
package com.starbooks.service.goal;

import com.starbooks.domain.goal.Goal;

public interface GoalService {
    Goal save(Goal goal);
    Goal find(Long id);
    void delete(Long id);
}
