// com.starbooks.service.announcement.AnnouncementServiceImpl.java
package com.starbooks.service.announcement;

import com.starbooks.domain.announcement.Announcement;
import com.starbooks.domain.announcement.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository repo;

    @Override
    public Announcement save(Announcement a) {
        return repo.save(a);
    }

    @Override
    public Announcement find(Long id) {
        return repo.findById(id).orElseThrow();
    }
}
