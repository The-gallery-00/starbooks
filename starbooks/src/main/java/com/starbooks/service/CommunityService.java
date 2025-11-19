package com.starbooks.service;

import com.starbooks.entity.CommunityPost;
import com.starbooks.repository.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityPostRepository communityPostRepository;

    public CommunityPost save(CommunityPost post) {
        return communityPostRepository.save(post);
    }

    public Optional<CommunityPost> findById(Long id) {
        return communityPostRepository.findById(id);
    }
}
