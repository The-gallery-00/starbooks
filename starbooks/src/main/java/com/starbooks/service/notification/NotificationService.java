// com.starbooks.service.notification.NotificationService
package com.starbooks.service.notification;

import com.starbooks.domain.notification.Notification;
import com.starbooks.domain.user.User;
import java.util.List;

public interface NotificationService {
    Notification save(Notification n);
    void markRead(Long id);
    List<Notification> getUserNotifications(User user);
}
