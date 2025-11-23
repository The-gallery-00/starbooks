package com.starbooks.service.community;

import com.starbooks.dto.community.CommunityPostRequest;
import com.starbooks.dto.community.CommunityPostResponse;

import java.util.List;

public interface CommunityPostService {

    CommunityPostResponse createPost(Long userId, CommunityPostRequest request);

    CommunityPostResponse getPost(Long postId);

    List<CommunityPostResponse> getPostsByBook(Long bookId);

    List<CommunityPostResponse> getAllPosts();

    void deletePost(Long userId, Long postId);
}
