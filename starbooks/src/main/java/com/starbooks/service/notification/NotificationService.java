package com.starbooks.service.notification;

import com.starbooks.domain.notification.Notification;

public interface NotificationService {
    Notification save(Notification n);
    void markRead(Long id);
}
