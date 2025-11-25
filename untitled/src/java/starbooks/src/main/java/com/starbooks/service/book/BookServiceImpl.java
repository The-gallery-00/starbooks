package java.starbooks.src.main.java.com.starbooks.service.book;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.book.BookRepository;
import com.starbooks.dto.book.BookRequest;
import com.starbooks.dto.book.BookResponse;
import java.starbooks.src.main.java.com.starbooks.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    // -----------------------
    // 1. 도서 등록 (관리자 기능)
    // -----------------------
    @Override
    public BookResponse createBook(BookRequest request) {

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .publisher(request.getPublisher())
                .isbn(request.getIsbn())
                .category(request.getCategory())
                .description(request.getDescription())
                .coverImage(request.getCoverImage())
                .publishDate(request.getPublishDate() != null
                        ? Date.valueOf(request.getPublishDate()).toLocalDate()
                        : null)
                .build();

        Book saved = bookRepository.save(book);

        return toResponse(saved);
    }

    // -----------------------
    // 2. 도서 상세 조회
    // -----------------------
    @Override
    public BookResponse getBook(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() ->
                        new NotFoundException("Book not found: " + bookId));

        return toResponse(book);
    }

    // -----------------------
    // 3. 도서 검색
    // -----------------------
    @Override
    public List<BookResponse> searchBooks(String keyword) {
        List<Book> books = bookRepository.findByTitleContainingIgnoreCase(keyword);
        return books.stream().map(this::toResponse).collect(Collectors.toList());
    }

    // -----------------------
    // 4. 인기 도서 조회
    // -----------------------
    @Override
    public List<BookResponse> getPopularBooks() {
        List<Book> books = bookRepository.findByIsPopularTrue();
        return books.stream().map(this::toResponse).collect(Collectors.toList());
    }

    // -----------------------
    // 엔티티 → DTO 변환
    // -----------------------
    private BookResponse toResponse(Book book) {
        return BookResponse.builder()
                .bookId(book.getBookId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .isbn(book.getIsbn())
                .category(book.getCategory())
                .description(book.getDescription())
                .coverImage(book.getCoverImage())
                .publishDate(book.getPublishDate() != null
                        ? book.getPublishDate().toString()
                        : null)
                .avgRating(book.getAvgRating())
                .reviewCount(book.getReviewCount())
                .isPopular(book.getIsPopular() == 1)
                .build();
    }
}
