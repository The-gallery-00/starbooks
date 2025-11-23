package com.starbooks.service.search;

import java.util.List;
import com.starbooks.domain.search.SearchHistory;

public interface SearchHistoryService {
    void saveSearchQuery(Long userId, String query);
    List<SearchHistory> getUserSearchHistory(Long userId);
    void deleteHistory(Long historyId);
}
