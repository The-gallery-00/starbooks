package com.starbooks.service.ranking;

import java.util.List;
import com.starbooks.domain.user.User;

public interface RankingService {
    List<User> getTopReaders(int limit);
}
