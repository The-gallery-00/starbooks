// src/main/java/com/starbooks/dto/bookshelf/BookshelfResponseDto.java
package com.starbooks.dto.bookshelf;

import com.starbooks.domain.book.Book;
import com.starbooks.domain.bookshelf.Bookshelf;
import com.starbooks.domain.bookshelf.BookshelfBook;
import com.starbooks.domain.bookshelf.ShelfType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookshelfResponseDto {

    private Long shelfId;
    private Long userId;
    private Long bookId;
    private String bookTitle;
    private String author;
    private String coverImage;
    private ShelfType shelfType;
    private Integer currentPage;
    private Integer totalPages;
    private Integer progressPercent; // 0~100%

    // ✅ BookshelfBook 기준으로 from() 생성
    public static BookshelfResponseDto from(BookshelfBook bookshelfBook) {
        Book book = bookshelfBook.getBook();
        Bookshelf shelf = bookshelfBook.getBookshelf();

        Integer cur = bookshelfBook.getCurrentPage();
        Integer total = bookshelfBook.getTotalPage();

        int progress = bookshelfBook.getProgress() != null
                ? bookshelfBook.getProgress()
                : 0;

        // progress 값이 0인데, 페이지 정보가 있다면 계산해서 채워주기
        if (progress == 0 && cur != null && total != null && total > 0) {
            progress = (int) Math.round(cur * 100.0 / total);
        }

        return BookshelfResponseDto.builder()
                .shelfId(shelf.getShelfId())
                .userId(shelf.getUser().getUserId())
                .bookId(book.getBookId())
                .bookTitle(book.getTitle())
                .author(book.getAuthor())
                .coverImage(book.getCoverImage())
                .shelfType(shelf.getShelfType())
                .currentPage(cur)
                .totalPages(total)
                .progressPercent(progress)
                .build();
    }
}
