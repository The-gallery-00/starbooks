// com.starbooks.service.announcement.AnnouncementService.java
package com.starbooks.service.announcement;

import com.starbooks.domain.announcement.Announcement;

public interface AnnouncementService {
    Announcement save(Announcement a);
    Announcement find(Long id);
}
