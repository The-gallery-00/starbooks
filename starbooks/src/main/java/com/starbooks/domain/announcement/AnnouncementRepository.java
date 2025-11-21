package com.starbooks.domain.announcement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    // 작성자(author) 기준 공지 조회
    List<Announcement> findByAuthorUserId(Long userId);

    // 최신순 공지 조회
    List<Announcement> findAllByOrderByCreatedAtDesc();

    // 제목 키워드 검색
    List<Announcement> findByTitleContaining(String keyword);

}
