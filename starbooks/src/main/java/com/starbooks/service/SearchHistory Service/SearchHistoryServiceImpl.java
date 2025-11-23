package com.starbooks.service.search;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.starbooks.domain.search.SearchHistory;
import com.starbooks.repository.search.SearchHistoryRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class SearchHistoryServiceImpl implements SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;

    @Override
    public void saveSearchQuery(Long userId, String query) {
        searchHistoryRepository.save(new SearchHistory(userId, query));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SearchHistory> getUserSearchHistory(Long userId) {
        return searchHistoryRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public void deleteHistory(Long historyId) {
        searchHistoryRepository.deleteById(historyId);
    }
}
