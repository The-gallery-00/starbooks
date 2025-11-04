
# 📘 독서기록 경쟁 웹 서비스 클래스 다이어그램 설계

## 📂 클래스 구성표

| 주요 클래스 | 주요 속성(Attributes) | 주요 메서드(Operations) | 관련 클래스 / 관계 |
|--------------|------------------------|---------------------------|----------------------|
| **User** | userId, password, nickname, email, profile, intro | login(), logout(), register(), editProfile(), viewProfile() | MyLibrary(1:1), Challenge(*:*), FriendList(1:1), CommunityPost(1:*) |
| **Admin (extends User)** | adminLevel | createChallenge(), addBook(), viewUserInfo() | Challenge(*:*), Book(*:*), User(*) |
| **Book** | bookId, title, author, category, avgRating, description, isPopular | viewDetail(), addToWishlist(), linkToPurchase() | Review(1:*), Challenge(*:*), Wishlist(*:*), User(*:*) |
| **Review** | reviewId, rating, content, favoriteQuote, createdDate | writeReview(), editReview(), deleteReview() | User(1), Book(1) |
| **Challenge** | challengeId, title, goal, startDate, endDate | createChallenge(), joinChallenge(), updateProgress() | User(*:*), Admin(1) |
| **MyLibrary** | libraryId, totalBooks, dailyGoal, progressRate | addBook(), removeBook(), viewCalendar() | User(1), Book(*:*), Review(1:*) |
| **FriendList** | friendId, friendNickname, status | addFriend(), removeFriend(), viewFriendList() | User(1:*), OtherUser(*) |
| **CommunityPost** | postId, postType(quiz/vote/discussion), content, createdDate | createPost(), editPost(), deletePost() | User(1), Book(1, optional) |
| **Notification** | notificationId, category, message, createdAt | viewNotification(), deleteNotification() | User(1) |
| **RankingSystem** | rankingId, category, rankList | calculateRank(), viewRanking() | User(*), Book(*) |
| **SearchSystem** | keyword, resultType, resultList | search() | Book(*), User(*), Post(*) |
| **Wishlist** | wishlistId, bookList | addBook(), removeBook(), viewWishlist() | User(1), Book(*:*) |

---

## 📊 클래스 간 관계 요약

| 관계 | 설명 |
|------|------|
| `User` ↔ `Book` | N:M (찜목록, 리뷰 등 다양한 관계로 연결) |
| `User` ↔ `Review` | 1:N (유저는 여러 리뷰 작성 가능) |
| `User` ↔ `Challenge` | N:M (여러 챌린지 참여 가능) |
| `User` ↔ `FriendList` | 1:N (여러 친구 가능) |
| `User` ↔ `CommunityPost` | 1:N (게시글 작성 가능) |
| `Admin` ↔ `Book`, `Challenge`, `User` | 관리 기능 담당 |
| `Book` ↔ `Review` | 1:N (한 책에 여러 리뷰 존재) |
| `Book` ↔ `Challenge` | N:M (챌린지 도서 목록 포함 가능) |
| `MyLibrary` ↔ `Book`, `Review` | 사용자의 개인 서재 기능 |
| `RankingSystem` ↔ `User` | 사용자별 랭킹 계산 |
| `SearchSystem` ↔ 여러 클래스 | 통합 검색 기능 담당 |

---

## 🧩 UML 구조 예시 (텍스트 기반)

```
User <|-- Admin
User "1" --> "1" MyLibrary
User "1" --> "*" Review
User "*" --> "*" Challenge
User "1" --> "*" CommunityPost
User "1" --> "*" Notification
User "1" --> "1" FriendList
MyLibrary "*" --> "*" Book
Book "1" --> "*" Review
Book "*" --> "*" Challenge
Challenge "*" --> "1" Admin
```
