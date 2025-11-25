package java.starbooks.src.main.java.com.starbooks.service.book;

import com.starbooks.domain.book.PurchaseLink;
import com.starbooks.domain.book.PurchaseLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseLinkServiceImpl implements PurchaseLinkService {

    private final PurchaseLinkRepository purchaseLinkRepository;

    @Override
    public List<PurchaseLink> getLinksByBook(Long bookId) {
        return purchaseLinkRepository.findByBookId(bookId);
    }
}
