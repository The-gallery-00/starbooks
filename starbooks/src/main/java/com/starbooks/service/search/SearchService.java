package com.starbooks.service.search;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.domain.community.CommunityPost;
import com.starbooks.domain.community.CommunityPostRepository;
import com.starbooks.domain.user.User;
import com.starbooks.domain.user.UserRepository;
import com.starbooks.dto.search.SearchResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final CommunityPostRepository communityPostRepository;

    public SearchResponseDto searchAll(String keyword) {
        List<Book> books = bookRepository.findByTitleContaining(keyword);
        List<User> users = userRepository.findByNicknameContaining(keyword);
        List<CommunityPost> posts = communityPostRepository.findByTitleContaining(keyword);

        return new SearchResponseDto(books, users, posts);
    }
}
