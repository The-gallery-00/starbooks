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

        if(post.getUser() == null) {
            throw new IllegalArgumentException("작성자 정보가 없습니다(User must be set)");
        }

        CommunityPost savedPost = postRepo.save(post);

        if (options != null && !options.isEmpty()) {
            for (PostOption opt : options) {
                opt.setPost(savedPost);
            }
            optionRepo.saveAll(options);
        }
        return savedPost;
    }

    public List<PostOption> getOptions(Long postId) {
        // repository 가 아니라 postRepo 사용
        CommunityPost post = postRepo.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));

        return optionRepo.findByPost(post);
    }
}

