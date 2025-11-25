package java.starbooks.src.main.java.com.starbooks.service.book;

import com.starbooks.domain.book.PurchaseLink;

import java.util.List;

public interface PurchaseLinkService {
    List<PurchaseLink> getLinksByBook(Long bookId);
}
