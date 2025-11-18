CREATE DATABASE IF NOT EXISTS starbooks CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE starbooks;

-- 1. 사용자 및 프로필
CREATE TABLE IF NOT EXISTS users (
    user_id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(50) NOT NULL UNIQUE,
    email           VARCHAR(120) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    nickname        VARCHAR(50) NOT NULL UNIQUE,
    role            ENUM('USER','ADMIN') DEFAULT 'USER',
    profile_image   VARCHAR(255),
    intro           VARCHAR(255), -- 자기소개
    is_active       TINYINT(1) DEFAULT 1,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id         BIGINT NOT NULL PRIMARY KEY,
    favorite_authors JSON,
    favorite_genres  JSON,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 2. 도서 및 외부 연동
CREATE TABLE IF NOT EXISTS books (
    book_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    author       VARCHAR(120) NOT NULL,
    publisher    VARCHAR(120),
    isbn         VARCHAR(20) UNIQUE,
    category     VARCHAR(80),
    description  TEXT,
    cover_image  VARCHAR(255),
    publish_date DATE,
    avg_rating   DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    is_popular   TINYINT(1) DEFAULT 0,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS purchase_links (
    link_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_id   BIGINT NOT NULL,
    site_name VARCHAR(80) NOT NULL,
    url       VARCHAR(255) NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. 내 서재 & 찜
CREATE TABLE IF NOT EXISTS bookshelves (
    shelf_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    shelf_type ENUM('READING','FINISHED','WISHLIST') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_shelf (user_id, shelf_type),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bookshelf_books (
    shelf_id BIGINT NOT NULL,
    book_id  BIGINT NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (shelf_id, book_id),
    FOREIGN KEY (shelf_id) REFERENCES bookshelves(shelf_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS wishlist_items (
    wishlist_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    book_id     BIGINT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_book (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. 독서 기록 및 리뷰
CREATE TABLE IF NOT EXISTS reading_records (
    record_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id          BIGINT NOT NULL,
    book_id          BIGINT NOT NULL,
    rating           TINYINT, -- 사용자의 별점
    review           TEXT,
    favorite_quote   TEXT,
    reading_status   ENUM('PLANNING','READING','FINISHED','PAUSED') NOT NULL DEFAULT 'PLANNING',
    progress_percent TINYINT DEFAULT 0,
    start_date       DATE,
    end_date         DATE,
    created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_book_record (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS book_reviews (
    review_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    book_id      BIGINT NOT NULL,
    rating       TINYINT NOT NULL,
    content      TEXT NOT NULL,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. 목표 & 캘린더 & 랭킹
CREATE TABLE IF NOT EXISTS goals (
    goal_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id        BIGINT NOT NULL,
    goal_type      ENUM('DAILY') NOT NULL,
    target_books   INT DEFAULT 0,
    target_pages   INT DEFAULT 0,
    achieved_books INT DEFAULT 0,
    start_date     DATE NOT NULL,
    end_date       DATE NOT NULL,
    last_updated   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_goal_period (user_id, goal_type, start_date),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reading_calendar (
    calendar_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    reading_date DATE NOT NULL,
    pages_read   INT DEFAULT 0,
    goal_achieved TINYINT(1) DEFAULT 0,
    progress_note VARCHAR(255),
    UNIQUE KEY uq_user_date (user_id, reading_date),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rankings (
    ranking_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    ranking_type ENUM('BOOK_COUNT','GOAL_STREAK','CHALLENGE_WINS') NOT NULL,
    rank_position INT NOT NULL,
    value         INT NOT NULL,
    calculated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. 챌린지
CREATE TABLE IF NOT EXISTS challenges (
    challenge_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(120) NOT NULL,
    description  TEXT,
    target_books INT NOT NULL,
    start_date   DATE NOT NULL,
    end_date     DATE NOT NULL,
    creator_id   BIGINT NOT NULL,
    status       ENUM('SCHEDULED','ACTIVE','COMPLETED','CANCELLED') DEFAULT 'SCHEDULED',
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS challenge_participants (
    participation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    challenge_id     BIGINT NOT NULL,
    user_id          BIGINT NOT NULL,
    progress         INT DEFAULT 0,
    is_completed     TINYINT(1) DEFAULT 0,
    joined_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_challenge_user (challenge_id, user_id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. 커뮤니티
CREATE TABLE IF NOT EXISTS community_posts (
    post_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    book_id    BIGINT,
    post_type  ENUM('QUIZ','POLL','DISCUSSION') NOT NULL,
    title      VARCHAR(150) NOT NULL,
    content    TEXT NOT NULL,
    is_published TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comments (
    comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id    BIGINT NOT NULL,
    user_id    BIGINT NOT NULL,
    content    TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES community_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. 친구 관계 & 알림
CREATE TABLE IF NOT EXISTS friends (
    friendship_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    requester_id  BIGINT NOT NULL,
    receiver_id   BIGINT NOT NULL,
    status        ENUM('PENDING','ACCEPTED','REJECTED','BLOCKED') DEFAULT 'PENDING', -- 차단 넣을건지?
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_friend_pair (requester_id, receiver_id),
    FOREIGN KEY (requester_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    category        ENUM('SYSTEM','FRIEND','CHALLENGE','COMMUNITY') NOT NULL,
    message         VARCHAR(255) NOT NULL,
    is_read         TINYINT(1) DEFAULT 0,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS announcements (
    announcement_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(150) NOT NULL,
    content     TEXT NOT NULL,
    author_id   BIGINT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. 검색 기록
CREATE TABLE IF NOT EXISTS search_history (
    search_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT,
    keyword     VARCHAR(120) NOT NULL,
    searched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL -- 로그인하지 않은 상태에서도 검색기록 수집가
) ENGINE=InnoDB;

-- 필수 인덱스
CREATE INDEX idx_books_title ON books (title);
CREATE INDEX idx_books_category ON books (category);
CREATE INDEX idx_records_user ON reading_records (user_id);
CREATE INDEX idx_records_book ON reading_records (book_id);
CREATE INDEX idx_posts_type ON community_posts (post_type);
CREATE INDEX idx_notifications_user ON notifications (user_id, is_read);



