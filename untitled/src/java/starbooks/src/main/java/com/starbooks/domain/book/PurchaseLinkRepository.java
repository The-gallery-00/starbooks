package java.starbooks.src.main.java.com.starbooks.domain.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseLinkRepository extends JpaRepository<PurchaseLink, Long> {

}
