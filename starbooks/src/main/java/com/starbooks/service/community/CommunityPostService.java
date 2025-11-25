// com.starbooks.service.community.CommunityPostService.java
package com.starbooks.service.community;

import com.starbooks.domain.community.CommunityPost;

public interface CommunityPostService {
    CommunityPost save(CommunityPost post);
    CommunityPost find(Long id);
    void delete(Long id);
}
