# StarBooks 시스템 설계 명세서 (SDS)
## System Design Specification

---

### 개정 이력 (Revision History)
| 개정일 | 버전 | 설명 | 작성자 |
|:---|:---|:---|:---|
| 2025-10-28 | 1.0 | 최초 작성 | 프로젝트팀 |

---

### 목차 (Contents)
1. [서론](#1-서론-introduction)
2. [유스케이스 분석](#2-유스케이스-분석-use-case-analysis)
3. [클래스 다이어그램](#3-클래스-다이어그램-class-diagram)
   - 3.1. [데이터베이스 클래스 다이어그램](#31-데이터베이스-클래스-다이어그램)
   - 3.2. [도메인 클래스 다이어그램](#32-도메인-클래스-다이어그램)
   - 3.3. [서비스 레이어 클래스 다이어그램](#33-서비스-레이어-클래스-다이어그램)
4. [시퀀스 다이어그램](#4-시퀀스-다이어그램-sequence-diagram)
   - 4.1. [사용자 관리 시퀀스 다이어그램](#41-사용자-관리-시퀀스-다이어그램)
   - 4.2. [독서 관리 시퀀스 다이어그램](#42-독서-관리-시퀀스-다이어그램)
   - 4.3. [커뮤니티 시퀀스 다이어그램](#43-커뮤니티-시퀀스-다이어그램)
5. [상태 기계 다이어그램](#5-상태-기계-다이어그램-state-machine-diagram)
6. [사용자 인터페이스 프로토타입](#6-사용자-인터페이스-프로토타입-user-interface-prototype)
7. [구현 요구사항](#7-구현-요구사항-implementation-requirements)
8. [용어 사전](#8-용어-사전-glossary)
9. [참고 문헌](#9-참고-문헌-references)

---

## 1. 서론 (Introduction)

본 문서는 StarBooks 독서 커뮤니티 웹 서비스의 시스템 설계 명세서(System Design Specification, SDS)이다. 이 문서는 기존에 식별된 기능적 요구사항을 바탕으로 시스템을 여러 관점에서 설계하고 분석한다.

본 시스템은 사용자가 독서 목표를 설정하고 꾸준히 책을 읽을 수 있도록 지원하며, 자신의 독서 습관을 분석하고 발전시킬 수 있도록 돕는 것을 목적으로 한다. 사용자는 자신의 독서 목표를 자유롭게 설정하고 독서 기록을 관리하며, 다른 사용자와 함께 공동 목표를 달성하기 위한 독서 챌린지에 참여할 수 있다.

### 1.1. 설계 접근법

- **유스케이스 분석**: 사용자 관점에서 소프트웨어가 제공하는 기능을 서술
- **클래스 다이어그램**: 시스템의 구조적 관점을 묘사
- **시퀀스 다이어그램**: 시스템의 동적 관점을 표현
- **상태 기계 다이어그램**: 시스템 상태 변화를 모델링
- **UI 프로토타입**: 사용자 인터페이스 관점에서 시스템을 설계

### 1.2. 시스템 아키텍처

StarBooks는 웹 기반 3-tier 아키텍처를 채택하며, 다음과 같은 구성 요소로 이루어진다:

- **프레젠테이션 계층**: React 기반 웹 프론트엔드
- **비즈니스 로직 계층**: Spring Boot 기반 백엔드 서비스
- **데이터 계층**: MySQL 데이터베이스

---

## 2. 유스케이스 분석 (Use Case Analysis)

본 장에서는 StarBooks 시스템의 유스케이스 다이어그램과 유스케이스 상세 명세를 제공한다.

### 2.1. 주요 액터

- **일반 사용자**: 독서 기록 관리, 커뮤니티 참여
- **관리자**: 시스템 관리, 도서 등록, 회원 관리

### 2.2. 주요 유스케이스

#### 유스케이스 #1: 회원가입
- **설명**: 사용자가 웹 서비스를 본격적으로 이용하기 위해 계정을 생성하는 절차
- **전제조건**: 없음
- **트리거**: 사용자가 회원가입 버튼 클릭
- **성공 후 조건**: 회원가입 완료 및 로그인 가능
- **주요 흐름**:
  1. 사용자가 웹에 접속하여 회원가입 버튼을 클릭
  2. 시스템이 회원가입 폼을 표시
  3. 사용자가 필수 정보(아이디, 비밀번호, 닉네임, 이메일) 입력
  4. 시스템이 입력 정보를 검증
  5. 유효한 정보인 경우 회원가입 완료

#### 유스케이스 #2: 독서 기록 관리
- **설명**: 사용자가 읽은 책에 대한 기록을 작성, 수정, 삭제하는 기능
- **전제조건**: 사용자 로그인 상태
- **트리거**: 독서 기록 작성 버튼 클릭
- **성공 후 조건**: 독서 기록이 저장되고 내 서재에 반영
- **주요 흐름**:
  1. 사용자가 도서 상세 페이지에서 기록하기 버튼 클릭
  2. 시스템이 독서 기록 작성 폼을 표시
  3. 사용자가 별점, 도서평, 좋아하는 구절 입력
  4. 시스템이 입력 데이터를 저장
  5. 독서 기록이 해당 도서와 연결되어 저장

#### 유스케이스 #3: 독서 챌린지 참여
- **설명**: 사용자가 개인 또는 그룹 독서 챌린지에 참여하여 목표 달성
- **전제조건**: 사용자 로그인 상태
- **트리거**: 챌린지 참여 버튼 클릭
- **성공 후 조건**: 챌린지 참여 등록 및 진행 상황 추적
- **주요 흐름**:
  1. 사용자가 챌린지 목록에서 참여할 챌린지 선택
  2. 시스템이 챌린지 상세 정보 표시
  3. 사용자가 참여 의사 확인
  4. 시스템이 사용자를 챌린지 참여자로 등록
  5. 독서 진행률에 따라 챌린지 달성률 업데이트

#### 유스케이스 #4: 커뮤니티 게시글 작성
- **설명**: 사용자가 퀴즈, 투표, 토론 형태의 게시글을 작성
- **전제조건**: 사용자 로그인 상태, 해당 도서 100% 완독
- **트리거**: 게시글 작성 버튼 클릭
- **성공 후 조건**: 게시글이 커뮤니티에 게시
- **주요 흐름**:
  1. 사용자가 커뮤니티 섹션에서 글쓰기 버튼 클릭
  2. 시스템이 글 종류 선택 옵션 표시 (퀴즈/투표/토론)
  3. 사용자가 글 종류 선택 및 내용 작성
  4. 시스템이 해당 도서 완독 여부 확인
  5. 게시글이 커뮤니티에 게시

---

## 3. 클래스 다이어그램 (Class Diagram)

이 장에서는 StarBooks 시스템의 클래스 다이어그램을 다양한 관점에서 제시한다.

### 3.1. 데이터베이스 클래스 다이어그램

데이터베이스의 구조를 나타내는 클래스 다이어그램으로, 주요 엔티티와 관계를 표현한다.

#### 주요 클래스:

**User**
- **속성**: userId(String), password(String), nickname(String), email(String), profileImage(String), createdAt(DateTime), isActive(Boolean)
- **설명**: 시스템 사용자의 기본 정보를 저장하는 클래스

**Book**
- **속성**: bookId(Long), title(String), author(String), publisher(String), isbn(String), publishDate(Date), coverImage(String), description(Text)
- **설명**: 도서 정보를 저장하는 클래스

**ReadingRecord**
- **속성**: recordId(Long), userId(String), bookId(Long), rating(Integer), review(Text), favoriteQuote(Text), readingStatus(Enum), progressPercent(Integer), startDate(Date), endDate(Date)
- **설명**: 사용자의 독서 기록을 저장하는 클래스

**Challenge**
- **속성**: challengeId(Long), title(String), description(Text), targetBooks(Integer), startDate(Date), endDate(Date), creatorId(String)
- **설명**: 독서 챌린지 정보를 저장하는 클래스

### 3.2. 도메인 클래스 다이어그램

비즈니스 도메인의 핵심 개념을 표현하는 클래스들과 그들 간의 관계를 나타낸다.

**UserProfile**
- **속성**: userId(String), nickname(String), introduction(Text), favoriteAuthors(List<String>), favoriteGenres(List<String>)
- **연관관계**: User와 1:1 관계

**BookShelf**
- **속성**: shelfId(Long), userId(String), shelfType(Enum), books(List<Book>)
- **연관관계**: User와 N:1 관계, Book과 N:M 관계

**Community**
- **속성**: postId(Long), authorId(String), bookId(Long), postType(Enum), title(String), content(Text), createdAt(DateTime)
- **연관관계**: User와 N:1 관계, Book과 N:1 관계

### 3.3. 서비스 레이어 클래스 다이어그램

비즈니스 로직을 처리하는 서비스 클래스들의 구조를 나타낸다.

**UserService**
- **메소드**: registerUser(), loginUser(), updateProfile(), getUserInfo()
- **설명**: 사용자 관리 관련 비즈니스 로직 처리

**BookService**
- **메소드**: searchBooks(), getBookDetails(), addBookToShelf(), removeBookFromShelf()
- **설명**: 도서 관리 관련 비즈니스 로직 처리

**ReadingService**
- **메소드**: createReadingRecord(), updateReadingProgress(), getReadingStatistics(), calculateReadingGoals()
- **설명**: 독서 기록 관리 관련 비즈니스 로직 처리

---

## 4. 시퀀스 다이어그램 (Sequence Diagram)

이 장에서는 주요 기능들의 동적 상호작용을 시퀀스 다이어그램으로 표현한다.

### 4.1. 사용자 관리 시퀀스 다이어그램

#### 회원가입 시퀀스
1. **사용자 → 웹페이지**: 회원가입 버튼 클릭
2. **웹페이지 → 사용자**: 회원가입 폼 표시
3. **사용자 → 웹페이지**: 회원 정보 입력 및 제출
4. **웹페이지 → UserController**: 회원가입 요청 전송
5. **UserController → UserService**: 회원가입 처리 요청
6. **UserService → UserRepository**: 사용자 데이터 저장 요청
7. **UserRepository → Database**: 사용자 정보 저장
8. **Database → UserRepository**: 저장 완료 응답
9. **UserRepository → UserService**: 저장 결과 반환
10. **UserService → UserController**: 회원가입 결과 반환
11. **UserController → 웹페이지**: 가입 성공 응답
12. **웹페이지 → 사용자**: 가입 완료 메시지 표시

### 4.2. 독서 관리 시퀀스 다이어그램

#### 독서 기록 작성 시퀀스
1. **사용자 → 도서 상세 페이지**: 기록하기 버튼 클릭
2. **도서 상세 페이지 → 사용자**: 독서 기록 작성 폼 표시
3. **사용자 → 독서 기록 폼**: 별점, 도서평, 구절 입력
4. **독서 기록 폼 → ReadingController**: 기록 저장 요청
5. **ReadingController → ReadingService**: 독서 기록 처리 요청
6. **ReadingService → ReadingRepository**: 기록 데이터 저장
7. **ReadingRepository → Database**: 독서 기록 저장
8. **Database → ReadingRepository**: 저장 완료 응답
9. **ReadingRepository → ReadingService**: 저장 결과 반환
10. **ReadingService → ReadingController**: 처리 결과 반환
11. **ReadingController → 독서 기록 폼**: 저장 성공 응답
12. **독서 기록 폼 → 사용자**: 저장 완료 메시지 표시

### 4.3. 커뮤니티 시퀀스 다이어그램

#### 게시글 작성 시퀀스
1. **사용자 → 커뮤니티 페이지**: 글쓰기 버튼 클릭
2. **커뮤니티 페이지 → ReadingService**: 도서 완독 여부 확인
3. **ReadingService → 커뮤니티 페이지**: 완독 확인 결과
4. **커뮤니티 페이지 → 사용자**: 게시글 작성 폼 표시
5. **사용자 → 게시글 작성 폼**: 제목, 내용, 유형 입력
6. **게시글 작성 폼 → CommunityController**: 게시글 생성 요청
7. **CommunityController → CommunityService**: 게시글 처리 요청
8. **CommunityService → CommunityRepository**: 게시글 저장
9. **CommunityRepository → Database**: 게시글 데이터 저장
10. **Database → CommunityRepository**: 저장 완료 응답
11. **CommunityRepository → CommunityService**: 저장 결과 반환
12. **CommunityService → CommunityController**: 처리 결과 반환
13. **CommunityController → 게시글 작성 폼**: 생성 성공 응답
14. **게시글 작성 폼 → 사용자**: 게시 완료 메시지 표시

---

## 5. 상태 기계 다이어그램 (State Machine Diagram)

### 5.1. 사용자 상태 다이어그램

**상태**:
- **미가입**: 시스템에 등록되지 않은 상태
- **가입**: 회원가입이 완료된 상태
- **로그인**: 인증되어 시스템을 이용할 수 있는 상태
- **로그아웃**: 세션이 종료된 상태
- **정지**: 관리자에 의해 계정이 정지된 상태

**전이**:
- 미가입 → 가입: 회원가입 완료
- 가입 → 로그인: 로그인 성공
- 로그인 → 로그아웃: 로그아웃 또는 세션 만료
- 로그인 → 정지: 관리자 계정 정지
- 정지 → 가입: 정지 해제

### 5.2. 독서 기록 상태 다이어그램

**상태**:
- **계획**: 읽을 예정인 도서
- **진행중**: 현재 읽고 있는 도서
- **완료**: 읽기를 완료한 도서
- **중단**: 읽기를 중단한 도서

**전이**:
- 계획 → 진행중: 독서 시작
- 진행중 → 완료: 독서 완료
- 진행중 → 중단: 독서 중단
- 중단 → 진행중: 독서 재개

---

## 6. 사용자 인터페이스 프로토타입 (User Interface Prototype)

### 6.1. 메인 화면
- **헤더**: 로고, 검색바, 사용자 메뉴
- **네비게이션**: 내 서재, 도서 정보, 커뮤니티, 챌린지, 랭킹
- **콘텐츠 영역**: 인기 도서, 추천 도서, 최근 활동

### 6.2. 내 서재 화면
- **독서 목표**: 일일/월간 독서 목표 설정 및 진행률
- **도서 목록**: 읽고 있는 도서, 읽은 도서, 찜한 도서 탭
- **독서 캘린더**: 월별 독서 활동 현황
- **독서 통계**: 독서 권수, 페이지 수, 장르별 분포

### 6.3. 도서 상세 화면
- **도서 정보**: 표지, 제목, 저자, 출판사, 줄거리
- **평점 및 리뷰**: 평균 별점, 사용자 리뷰 목록
- **액션 버튼**: 찜하기, 내 서재 추가, 구매 링크
- **관련 도서**: 같은 저자/장르의 다른 도서

### 6.4. 커뮤니티 화면
- **게시글 목록**: 퀴즈, 투표, 토론 게시글
- **필터링**: 도서별, 장르별, 게시글 유형별
- **게시글 작성**: 글쓰기 버튼 및 작성 폼

---

## 7. 구현 요구사항 (Implementation Requirements)

### 7.1. 하드웨어 플랫폼 요구사항

**웹 서버**:
- **프로세서**: Intel Xeon 또는 AMD EPYC 2.0GHz 이상
- **메모리**: 8GB RAM 이상
- **저장공간**: 100GB SSD 이상
- **네트워크**: 1Gbps 이상

**데이터베이스 서버**:
- **프로세서**: Intel Xeon 또는 AMD EPYC 2.5GHz 이상
- **메모리**: 16GB RAM 이상
- **저장공간**: 500GB SSD 이상

### 7.2. 소프트웨어 플랫폼 요구사항

**백엔드**:
- **운영체제**: Ubuntu 20.04 LTS 이상
- **Java**: OpenJDK 17 이상
- **Spring Boot**: 3.0 이상
- **데이터베이스**: MySQL 8.0 이상

**프론트엔드**:
- **Node.js**: 18.0 이상
- **React**: 18.0 이상
- **브라우저 호환성**: Chrome 90+, Firefox 88+, Safari 14+

### 7.3. 비기능적 요구사항

- **성능**: 응답시간 2초 이하
- **가용성**: 99.5% 이상
- **보안**: HTTPS 통신, JWT 토큰 인증
- **확장성**: 동시 사용자 1,000명 지원

---

## 8. 용어 사전 (Glossary)

| 용어 | 설명 |
|:---|:---|
| SDS | System Design Specification, 시스템 설계 명세서 |
| 독서 기록 | 사용자가 읽은 책에 대한 별점, 리뷰, 구절 등의 기록 |
| 독서 챌린지 | 정해진 기간 내에 목표량의 독서를 달성하는 활동 |
| 내 서재 | 사용자의 개인 도서 관리 공간 |
| 커뮤니티 | 사용자들이 책에 대해 소통하는 공간 |
| 진행률 | 도서 읽기 완료 정도를 백분율로 나타낸 것 |
| 찜하기 | 관심 있는 도서를 개인 목록에 저장하는 기능 |

---

## 9. 참고 문헌 (References)

1. Software Engineering: A Practitioner's Approach, Roger S. Pressman
2. UML Distilled: A Brief Guide to the Standard Object Modeling Language, Martin Fowler
3. Spring Boot Reference Documentation
4. React Documentation
5. MySQL Documentation
6. RESTful Web Services, Leonard Richardson
