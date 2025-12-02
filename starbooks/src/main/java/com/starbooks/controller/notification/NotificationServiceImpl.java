// com.starbooks.service.notification.NotificationServiceImpl
package com.starbooks.controller.notification;

import com.starbooks.domain.notification.Notification;
import com.starbooks.domain.notification.NotificationRepository;
import com.starbooks.domain.user.User;
import com.starbooks.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    @Override
    public Notification save(Notification n) {
        if (n.getCreatedAt() == null) {
            n.setCreatedAt(java.time.LocalDateTime.now());
        }
        if (n.getIsRead() == null) {
            n.setIsRead(false);
        }
        return repository.save(n);
    }

    @Override
    public void markRead(Long id) {
        Notification n = repository.findById(id).orElseThrow(
                () -> new RuntimeException("Notification not found")
        );
        n.setIsRead(true);
        repository.save(n);
    }

    @Override
    public List<Notification> getUserNotifications(User user) {
        return repository.findByUserOrderByCreatedAtDesc(user);
    }
}
