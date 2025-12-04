// com.starbooks.service.community.CommunityPostService.java
package com.starbooks.service.community;

import com.starbooks.domain.community.CommunityPost;
import com.starbooks.domain.community.PostOption;

import java.util.List;

public interface CommunityPostService {
    CommunityPost save(CommunityPost post);
    CommunityPost find(Long id);
    List<CommunityPost> findAll();
    void delete(Long id);
    CommunityPost saveWithOptions(CommunityPost post, List<PostOption> options);
}
