package com.starbooks.dto.search;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.community.CommunityPost;
import com.starbooks.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SearchResponseDto {
    private List<Book> books;
    private List<CommunityPost> posts;
}
