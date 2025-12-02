package com.starbooks.service.notification;

import com.starbooks.domain.notification.Notification;
import com.starbooks.domain.notification.NotificationRepository;
import com.starbooks.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repo;

    @Override
    public Notification save(Notification n) {
        return repo.save(n);
    }

    @Override
    public void markRead(Long id) {
        Notification n = repo.findById(id).orElseThrow();
        n.setIsRead(true);
        repo.save(n);
    }

    @Override
    public List<Notification> getUserNotifications(User user) {
        return List.of();
    }
}
