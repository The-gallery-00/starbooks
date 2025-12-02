// com.starbooks.domain.notification.NotificationRepository
package com.starbooks.domain.notification;

import com.starbooks.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}
