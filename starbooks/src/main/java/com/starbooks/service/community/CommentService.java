// com.starbooks.service.community.CommentService
package com.starbooks.service.community;

import com.starbooks.dto.community.CommentRequestDto;
import com.starbooks.dto.community.CommentResponseDto;
import java.util.List;

public interface CommentService {
    CommentResponseDto addComment(CommentRequestDto dto);
    List<CommentResponseDto> getComments(Long postId);
}
