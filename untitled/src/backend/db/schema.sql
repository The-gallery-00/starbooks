CREATE DATABASE IF NOT EXISTS starbooks
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

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
    intro           VARCHAR(255),
    is_active       TINYINT(1) DEFAULT 1,
    daily_page_goal INT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id          BIGINT NOT NULL PRIMARY KEY,
    favorite_authors TEXT,
    favorite_genres  TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 2. 도서
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

-- 3. 내 서재 (WISHLIST 포함)
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

-- 4. 독서 기록 & 리뷰
CREATE TABLE IF NOT EXISTS reading_records (
    record_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id          BIGINT NOT NULL,
    book_id          BIGINT NOT NULL,
    rating           TINYINT,
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

-- 5. 목표 & 캘린더
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
    calendar_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL,
    reading_date  DATE NOT NULL,
    pages_read    INT DEFAULT 0,
    goal_achieved TINYINT(1) DEFAULT 0,
    progress_note VARCHAR(255),
    UNIQUE KEY uq_user_date (user_id, reading_date),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rankings (
    ranking_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL,
    ranking_type  ENUM('BOOK_COUNT','GOAL_STREAK','CHALLENGE_WINS') NOT NULL,
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

-- 7. 커뮤니티 (수정됨)
CREATE TABLE IF NOT EXISTS community_posts (
    post_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    book_title   VARCHAR(200), -- 책 제목 직접 저장!!
    post_type    ENUM('QUIZ','POLL','DISCUSSION') NOT NULL,
    title        VARCHAR(150) NOT NULL,
    content      TEXT, -- QUIZ/POLL은 문제 질문만 저장
    created_at   DATETIME, 
    updated_at   DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7-1. 퀴즈 / 투표 선택지 (수정됨)
CREATE TABLE IF NOT EXISTS post_options (
    option_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id      BIGINT NOT NULL,
    option_text  VARCHAR(255) NOT NULL, -- 선택지 내용
    is_correct   TINYINT(1) DEFAULT 0, -- QUIZ 정답 여부
    option_order INT DEFAULT 0, -- 선택지 순서
    FOREIGN KEY (post_id) REFERENCES community_posts(post_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7-2. 사용자가 선택한 정답 저장 (수정됨)
CREATE TABLE IF NOT EXISTS post_answers (
    answer_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id     BIGINT NOT NULL,
    user_id     BIGINT NOT NULL,
    option_id   BIGINT NOT NULL,
    answered_at DATETIME,
    FOREIGN KEY (post_id) REFERENCES community_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES post_options(option_id) ON DELETE CASCADE,
    UNIQUE KEY uq_post_user (post_id, user_id) -- 한 게시글당 1번만 응답
) ENGINE=InnoDB;

-- 7-3. 댓글 테이블 (변경 없음)
CREATE TABLE IF NOT EXISTS comments (
    comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id    BIGINT NOT NULL,
    user_id    BIGINT NOT NULL,
    content    TEXT NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (post_id) REFERENCES community_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. 친구 관계 (대칭성)
CREATE TABLE IF NOT EXISTS friends (
    friendship_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    requester_id  BIGINT NOT NULL,
    receiver_id   BIGINT NOT NULL,
    status        ENUM('PENDING','ACCEPTED','REJECTED','BLOCKED') DEFAULT 'PENDING',
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_friend_pair UNIQUE (
        LEAST(requester_id, receiver_id),
        GREATEST(requester_id, receiver_id)
    ),
    FOREIGN KEY (requester_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. 알림 & 공지
CREATE TABLE IF NOT EXISTS notifications (
    notification_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id            BIGINT NOT NULL,           -- 알림 받는 사람
    ref_friendship_id  BIGINT NULL,               -- 친구 요청 알림일 때만 사용
    category           ENUM('SYSTEM','FRIEND','CHALLENGE','COMMUNITY') NOT NULL,
    message            VARCHAR(255) NOT NULL,
    is_read            TINYINT(1) DEFAULT 0,
    created_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ref_friendship_id) REFERENCES friends(friendship_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS announcements (
    announcement_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(150) NOT NULL,
    content     TEXT NOT NULL,
    author_id   BIGINT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. 검색 기록
CREATE TABLE IF NOT EXISTS search_history (
    search_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT,
    keyword     VARCHAR(120) NOT NULL,
    searched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 11. 도서 찜하기
CREATE TABLE favorites (
    favorite_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book_id), -- 중복 찜 방지
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- 12.챌린지 관련 생성 삭제 현황
CREATE TABLE IF NOT EXISTS challenge_participants (
    participant_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    challenge_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    joined_at DATETIME NOT NULL,
    CONSTRAINT fk_cp_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id) ON DELETE CASCADE,
    CONSTRAINT fk_cp_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY uk_challenge_user (challenge_id, user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- Indexes
CREATE INDEX idx_books_title        ON books (title);
CREATE INDEX idx_books_category     ON books (category);
CREATE INDEX idx_records_user       ON reading_records (user_id);
CREATE INDEX idx_records_book       ON reading_records (book_id);
CREATE INDEX idx_posts_type         ON community_posts (post_type);
CREATE INDEX idx_notifications_user ON notifications (user_id, is_read);

-- 퀴즈/투표 관련 인덱스
CREATE INDEX idx_post_options_post_id   ON post_options (post_id);
CREATE INDEX idx_post_answers_post_user ON post_answers (post_id, user_id);
