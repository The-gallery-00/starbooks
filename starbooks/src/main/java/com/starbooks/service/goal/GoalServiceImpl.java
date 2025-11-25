// com.starbooks.service.goal.GoalServiceImpl.java
package com.starbooks.service.goal;

import com.starbooks.domain.goal.Goal;
import com.starbooks.domain.goal.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository repo;

    @Override
    public Goal save(Goal goal) {
        return repo.save(goal);
    }

    @Override
    public Goal find(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
