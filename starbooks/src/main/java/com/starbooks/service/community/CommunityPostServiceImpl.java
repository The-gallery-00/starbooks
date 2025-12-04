package com.starbooks.service.community;

import com.starbooks.domain.community.CommunityPost;
import com.starbooks.domain.community.CommunityPostRepository;
import com.starbooks.domain.community.PostOption;
import com.starbooks.domain.community.PostOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityPostServiceImpl implements CommunityPostService {

    private final CommunityPostRepository postRepo;
    private final PostOptionRepository optionRepo;

    @Override
    public CommunityPost save(CommunityPost post) {
        return postRepo.save(post);
    }

    @Override
    public CommunityPost find(Long id) {
        return postRepo.findById(id).orElseThrow();
    }

    @Override
    public List<CommunityPost> findAll() {
        return postRepo.findAll();
    }

    @Override
    public void delete(Long id) {
        CommunityPost post = find(id);
        postRepo.delete(post);
    }

    @Override
    public CommunityPost saveWithOptions(CommunityPost post, List<PostOption> options) {

        // 1️⃣ 게시글 먼저 저장
        CommunityPost savedPost = postRepo.save(post);

        // 2️⃣ 옵션 저장하며 post_id 관계 매핑
        if(options != null && !options.isEmpty()) {
            for(PostOption opt : options) {
                opt.setPost(savedPost);
            }
            optionRepo.saveAll(options);
        }

        return savedPost;
    }
}

