# StarBooks 백엔드 아키텍처 개요

본 문서는 `book_web_class_diagram.md`, `SDS_Starbooks.md`, `SRS_Starbooks.md`를 토대로 설계한 StarBooks 백엔드 산출물이다. Spring Boot 3.x + MySQL 8.x 조합을 전제로 하며, REST API, JWT 인증, 이벤트 기반 비동기 처리, WebSocket 알림 등을 포함한다.

## 1. 시스템 레이어 및 모듈
- **API Layer**: Spring MVC Controller, 요청 검증, 예외 처리, HATEOAS 링크.
- **Application Layer**: UseCase/Service. 트랜잭션 경계, 도메인 이벤트 발행.
- **Domain Layer**: Aggregate Root(`User`, `Book`, `Challenge` 등), Value Object(`ReadingProgress`, `GoalPeriod` 등).
- **Infrastructure Layer**: JPA Repository, 외부 API(베스트셀러, 이메일), Redis 캐시, WebSocket, Scheduler.

주요 모듈:
| 모듈 | 설명 |
| --- | --- |
| `account-service` | 회원가입/로그인, JWT, OAuth2 소셜 로그인 확장 |
| `library-service` | 내 서재, 독서 기록, 목표/캘린더 |
| `book-service` | 도서 CRUD, 검색, 외부 서점 API 연동 |
| `challenge-service` | 챌린지 생성/참여/랭킹 |
| `community-service` | 커뮤니티 게시글, 댓글, 투표, 퀴즈 |
| `social-service` | 친구 관계, 알림 |
| `analytics-service` | 인기 도서, 통합 랭킹, 추천 |

## 2. 핵심 흐름
1. **인증**: `AuthController`가 Credentials → `AuthService` → `UserRepository`. 성공 시 Access/Refresh 토큰 발급, Redis BL 관리.
2. **도서 상세**: `BookController` → `BookService#getBookDetails` → `BookRepository`, `ReviewRepository`, `WishlistRepository`. Aggregation Layer에서 DTO 구성 후 반환.
3. **독서 기록**: `ReadingRecordController` → `ReadingService`. 진행률 업데이트 시 `ReadingProgressUpdatedEvent` 발행 → `GoalProjectionHandler`, `RankingProjectionHandler`.
4. **챌린지**: 생성은 관리자 전용 Scope. 참여 시 월 단위 중복 검증 후 `ChallengeParticipant` 저장. 배치가 종료 판정과 알림 전송.
5. **커뮤니티**: 게시글 작성 시 완독 여부 검증 → `CommunityPolicy`로 Guard. 댓글/투표/퀴즈는 서브도메인 서비스가 처리.
6. **알림**: 도메인 이벤트 → `NotificationService` → DB 저장 → WebSocket Push (STOMP) + FCM 확장 포인트.

## 3. 데이터 저장소
- **MySQL 8.0**: 정규화된 OLTP 스키마. 필수 테이블은 `db/schema.sql` 참고.
- **Redis**: 세션 블랙리스트, 레이트 리밋, 인기 검색어 캐시, 실시간 랭킹 임시 저장.
- **S3/Cloud Storage**: 프로필/도서 커버 업로드.

## 4. 통신 규약
- REST API: `/api/v1` prefix. 응답 JSON 표준 포맷 `{ "success": true, "data": ..., "error": null }`.
- Authentication: `Authorization: Bearer <JWT>`. Refresh 토큰은 HTTP-only Secure 쿠키.
- WebSocket: `/ws/notifications`, STOMP topic `/topic/users/{userId}`.
- 외부 API: 서점 인기 도서(예: 알라딘 TTB). Circuit Breaker (Resilience4j) 적용.

## 5. 비기능 설계
- **보안**: HTTPS, JWT + Refresh, BCrypt 비밀번호, Role 기반 Method Security.
- **성능**: 캐시, ElasticSearch 기반 통합 검색 확장, Batch + CQRS Projection.
- **테스트 전략**:
  - Unit: JUnit5 + Mockito
  - Integration: Testcontainers(MySQL, Redis)
  - Contract: Spring Cloud Contract
- **배포 파이프라인**: GitHub Actions → Docker Build → ArgoCD/K8s. Profile 분리(dev/stage/prod).

## 6. 산출물 구조
```
backend/
├─ README.md              # 본 문서
├─ openapi/
│   └─ starbooks-api.yaml # OpenAPI 3.0 사양
└─ db/
    └─ schema.sql         # MySQL DDL
```

이후 실제 구현 시 `src/main/java` 구조를 추가하고, 모듈을 멀티모듈 Gradle(Groovy) 혹은 Maven으로 구성하면 된다.

