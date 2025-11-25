import java.util.List;
import com.starbooks.domain.notification.Notification;

public interface NotificationService {
    Notification sendNotification(Long userId, String message);
    List<Notification> getNotifications(Long userId);
    void markAsRead(Long notificationId);
}
