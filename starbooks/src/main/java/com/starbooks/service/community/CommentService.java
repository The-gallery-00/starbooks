package com.starbooks.service.community;

import com.starbooks.dto.community.CommentRequest;
import com.starbooks.dto.community.CommentResponse;

import java.util.List;

public interface CommentService {

    CommentResponse addComment(Long userId, CommentRequest request);

    List<CommentResponse> getComments(Long postId);

    void deleteComment(Long userId, Long commentId);
}
