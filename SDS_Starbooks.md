# StarBooks 시스템 설계 명세서 (SDS)
## System Design Specification

---

### 개정 이력 (Revision History)
| 개정일 | 버전 | 설명 | 작성자 |
|:---|:---|:---|:---|
| 2025-10-28 | 1.0 | 최초 작성 | 22012167 김건희 |
| 2025-10-29 | 1.1 | 내용 및 다이어그램 추가 | 프로젝트 팀 |

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
 
#### 유스케이스 #1-1: 로그인 및 로그아웃
- **설명**: 사용자가 웹 서비스를 이용하기 위해 계정을 검증
- **전제조건**: 사용자의 정보가 회원가입이 완료되어 서버에 유저의 정보가 이미 존재
- **트리거**: 사용자가 로그인 정보를 입력후 로그인 버튼 클릭
- **성공 후 조건**: 로그인후 로그인 되어있는 상태에서의 활동가능
- **주요 흐름**:
  1. 사용자가 웹에 접속하여 로그인 버튼을 클릭
  2. 시스템이 로그인 폼을 표시
  3. 사용자가 로그인 정보(아이디, 비밀번호) 입력
  4. 시스템이 입력 정보를 검증
  5. 유효한 정보인 경우 로그인 완료
  6. 로그인 환경에서 로그아웃 버튼을 클릭하면 로그아웃 가능

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

#### 유스케이스 #3: 도서 상세 페이지
- **설명**: 각각의 도서에 대한 상세 내용을 제공
- **전제조건**: 해당 도서가 관리자에 의해 등록되어 있는 도서이어야함
- **트리거**:  사용자가 해당 도서를 클릭할때
- **성공 후 조건**: 유저가 클릭한 도서에 대한 상세 페이지 팝업
- **주요 흐름**:
  1. 사용자가 도서를 클릭하여 도서의 상세 페이지를 로드
  2. 해당 도서 상세 페이지에 도서의 제목, 저자, 별점, 카테고리등의 세부정보를 표시
  3. 사용자가 로그인중이라면, 해당도서를 읽는중, 찜하기 등의 표시가능

#### 유스케이스 #4: 독서 챌린지 생성
- **설명**: 관리자가 독서 챌린지를 생성하여 사용자간의 경쟁 및 목표 제공
- **전제조건**: 관리자 로그인 필요
- **트리거**: 관리자가 독서 챌린지를 생성할때
- **성공 후 조건**: 관리자가 목표 설정을 하여 챌린지를 생성하여 다른 사용자간의 경쟁 및 목표 제공
- **주요 흐름**:
   1.관리자 권한으로 로그인
   2.독서 챌린지로 이동
   3.독서 챌린지 생성에서 목표를 설정후 생성
     
#### 유스케이스 #4-1: 독서 챌린지 참여
- **설명**: 사용자가 개인 또는 그룹 독서 챌린지에 참여하여 목표 달성
- **전제조건**: 사용자 로그인 상태 및 이번달 독서 챌린지 기록이 없어야야함.
- **트리거**: 챌린지 참여 버튼 클릭
- **성공 후 조건**: 챌린지 참여 등록 및 진행 상황 추적
- **주요 흐름**:
  1. 사용자가 챌린지 목록에서 참여할 챌린지 선택
  2. 시스템이 챌린지 상세 정보 표시
  3. 사용자가 참여 의사 확인
  4. 시스템이 사용자를 챌린지 참여자로 등록
  5. 독서 진행률에 따라 챌린지 달성률 업데이트

#### 유스케이스 #5: 커뮤니티 게시글 작성
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

#### 유스케이스 #6: 프로필 설정
- **설명**: 사용자가 접근가능하고, 수정가능한 유저정보를 웹에서 수정기능을 제공
- **전제조건**: 사용자의 계정이 로그인되어있는 상태
- **트리거**: 마이페이지에서 프로필 설정 버튼 클릭
- **성공 후 조건**: 프로필 설정 페이지에서 수정 가능한 유저 정보 수정가능
- **주요 흐름**:
  1. 사용자가 로그인 후 마이페이지 진입
  2. 마이페이지 수정 버튼을 눌러 수정가능한 정보(닉네임, 자기소개 등)을 수정
  3. 저장 버튼을 눌러 수정된 정보를 저장

#### 유스케이스 #7: 회원정보 조회
- **설명**: 관리자가 회원들의 정보 조회 및 관리 가능
- **전제조건**: 관리자 권한으로 로그인이 되어 있어야 함.
- **트리거**: 관리자 권한 로그인 후,
프로필 클릭 시, 회원 정보 찾을 수 있음
- **성공 후 조건**: 회원 정보를 클릭 해, 관리 가능
- **주요 흐름**:
  1. 관리자 권한으로 로그인 한다.
  2. 관리자 프로필을 클릭 한다.
  3. 회원들의 정보가 나열되는데, 회원 정보를 클릭하여 관리를 가능케 한다.

#### 유스케이스 #8: 친구목록
- **설명**: 사용자는 마이페이지에서 친구 목록을 관리 할 수 있다.
- **전제조건**: 로그인이 되어있어야 한다.
- **트리거**: 로그인 후 마이페이지를 들어가 친구 목록에 들어간다
- **성공 후 조건**: 친구목록에서 다른 친구를 추가 및 삭제를 할 수 있다
- **주요 흐름**:
   1. 로그인 한다
   2. 마이페이지에 들어간다
   3. 친구 목록에 들어간다
   4. 새로운 친구 추가 및 원래 친구 삭제가 가능하다.

#### 유스케이스 #9: 다른 사용자 프로필 열람
- **설명**: 사용자가 다른 사용자의 프로필을 조회하고, 친구 요청을 보낼 수 있다.
- **전제조건**: 요청 보낼 사용자가 로그인 상태
- **트리거**: 다른 사용자의 닉네임이나 프로필을 조회하여 클릭한다.
- **성공 후 조건**: 다른 사용자의 프로필 화면으로 이동
- **주요 흐름**:
   1. 요청 보낼 사용자가 로그인 상태이다.
   2. 다른 사용자의 닉네임이나 프로필을 클릭한다.
   3. 해당 사용자의 프로필 화면으로 넘어간다.

#### 유스케이스 #10: 통합 검색
- **설명**: 사용자는 검색 창에 입력하여, 웹 서비스 내 데이터를 검색할 수 있다
- **전제조건**: 없음
- **트리거**: 메인화면에 검색 창을 눌러 텍스트를 입력한다.
- **성공 후 조건**: 검색어의 카테고리를 분류해, 해당 카테고리의 페이지로 이동함
- **주요 흐름**:
   1. 로그인을 한다.
   2. 메인 화면에 검색 버튼을 클릭한다.
   3. 검색어를 입력한다.
   4. 검색어의 카테고리에 따른 맞는 페이지로 이동한다.

#### 유스케이스 #11: 목표 설정
- **설명**: 사용자는 마이페이지에서 본인의 목표를 설정할 수 있다.
- **전제조건**: 로그인 상태
- **트리거**: 로그인 후 상단에 서재 페이지를 클릭한다.
- **성공 후 조건**: 서재 페이지로 들어가서 목표설정과 하루 목표정도 확인 가능
- **주요 흐름**:
   1. 로그인을 한다.
   2. 홈페이지에 서재 페이지 버튼 클릭
   3. 서재 페이지에서 하루 목표설정과 목표정도 확인 가능

#### 유스케이스 #12: 나의 도서 목록
- **설명**: 사용자는 서재 페이지에서 자신의 책 목록을 확인 및 관리할 수 있다.
- **전제조건**: 로그인 상태
- **트리거**: 서재 페이지에서 책 목록 관리 버튼 클릭
- **성공 후 조건**: 본인의 책 목록에서 카테고리 구분 및 수정이 가능하다.
- **주요 흐름**:
   1. 로그인을 한다. 
   2. 서재 페이지를 클릭한다
   3. 책 목록에서 제거 및 추가를 할 수 있고, 카테고리 별로 구분도 가능하다

#### 유스케이스 #13: 독서 평가 작성 및 수정
- **설명**: 사용자가 내 서재에서 책에 대한 평가,별점을 작성/수정/삭제를 할 수 있다
- **전제조건**: 로그인 상태, 내 서재에 책이 추가된 상태
- **트리거**: 내 서재 리스트에서 해당 책의 기록하기 버튼 클릭
- **성공 후 조건**: 해당 책의 독서기록 작성 페이지로 이동 후, 수정 및 별점 등록가능
- **주요 흐름**:
  1. 로그인한 사용자가 작성하고자 하는 책을 서재에 추가한 상태
  2. 내 서재 클릭 후 페이지 이동
  3. 기록하기 버튼 클릭 
  4. 해당 책의 별점 및 기록 작성 가능
  
#### 유스케이스 #14: 독서 켈린더
- **설명**: 사용자가 내 서재에서 독서 활동 규모 확인 및 목표 달성상태 확인 가능
- **전제조건**: 로그인 상태
독서 활동이 활성화 된 상태
- **트리거**: 내 서재 페이지를 클릭
- **성공 후 조건**: 내 서재 페이지에서 독서 활동 진행률을 캐릭터의 색상에 따라 확인 가능,
독서 진행 상황 수정 가능
- **주요 흐름**:
  1. 로그인
  2. 내 서재 페이지 진입
  3. 독서의 진행정도 수정 및 열람가능

#### 유스케이스 #15: 인기 도서 정보
- **설명**: 사용자에게 시스템에 등록된 도서중 인기 도서 정보 제공
- **전제조건**: 없음
- **트리거**: 웹의 인기도서 탭 클릭 및 열람
- **성공 후 조건**: 인기 도서의 탭 및 섹션에서 인기 도서 목록 확인 가능,
클릭 시 해당 도서 상세 페이지 이동 가능
- **주요 흐름**:
   1. 로그인
   2. 메인 화면의 인기 도서 탭 및 섹션에서 확인 가능
   3. 도서 클릭 시 해당 도서 상세 페이지 이동

#### 유스케이스 #16: 독자 리뷰 및 추천 별점 표시
- **설명**: 해당 도서의 독자들이 작성한 독서 기록및 별점이 표시되어 열람가능
- **전제조건**: 도서의 후기 및 별점이 작성되어 있을 때
- **트리거**: 사용자가 도서 상세페이지 클릭
- **성공 후 조건**: 도서 상세 페이지에서 해당 도서의 별점 및 독서평을 볼 수 있음
- **주요 흐름**:
   1. 메인 페이지에서 도서를 클릭하여 상세페이지로 이동
   2. 해당 도서 상세페이지에서 별점과 다른 독자들의 독서평을 확인 가능
   3. 만약 로그인한 유저이고, 해당 도서를 읽었던 유저라면 별점 및 독서평 작성 가능

#### 유스케이스 #17: 도서 추가
- **설명**: 관리자는 기존에 등록되어 있지 않은 도서를 시스템에 등록 할 수 있다.
- **전제조건**: 관리자의 권한으로 로그인이 되어 있어야 한다.
- **트리거**: 시스템에서 신규 도서 추가를 한다.
- **성공 후 조건**: 도서 목록 데이터에 신규 도서가 추가된다.
- **주요 흐름**:
   1. 관리자 권한 로그인
   2. 신규 도서 정보 등록
   3. 필수 입력 요소 미기입 시, 오류메세지 출력

#### 유스케이스 #18: 도서 찜하기
- **설명**: 사용자는 관심있는 도서를 찜목록에 추가 및 삭제할 수 있다
- **전제조건**: 사용자가 로그인된 상태
- **트리거**: 도서 상세 페이지에서 하트 모양 아이콘 클릭 및 해제
- **성공 후 조건**: 하트 아이콘을 누르면 내 찜목록에 추가되고, 이미 찜목록에 추가된 도서의 경우 찜목록에서 해제된다
- **주요 흐름**:
   1. 로그인
   2. 해당 도서를 클릭 후, 상세페이지로 이동
   3. 도서 상세페이지의 하트 모양 아이콘 클릭
 
#### 유스케이스 #19: 도서 구매 사이트 연결
- **설명**: 사용자는 구매하고 싶은 도서를 외부 사이트와 연결하여 
구매 가능
- **전제조건**: 해당 도서가 연결된 외부 사이트에 있어야 함
- **트리거**: 도서 상세 페이지에서 구매하기 버튼 클릭
- **성공 후 조건**:  해당 도서의 판매 사이트로 이동
- **주요 흐름**:
   1. 해당 도서를 클릭 후 상세 페이지로 이동
   2. 상세 페이지 내 해당 도서의 구매페이지로 이동하기 클릭
   3. 외부 사이트로 이동

#### 유스케이스 #20: 랭킹 시스템
- **설명**: 메인 화면에서 웹 사이트의 전체 사용자를 대상으로 몇 가지 독서 지표에 따라 순위 제공
- **전제조건**: 회원가입한 사용자들에 대해 랭킹 제공, 열람에는 로그인 필요하지 않음
- **트리거**: 메인 화면에서 지표별 랭킹 확인 가능
- **성공 후 조건**: 메인 화면에서 성취 지표에 따른 사용자의 랭킹 열람 가능
- **주요 흐름**:
   1. 회원가입된 유저를 대상으로한 지표별 랭킹기능을 메인 화면에 게시
   2. 메인 화면에서 성취 지표에 따라 랭킹 확인 가능

#### 유스케이스 #21: 공지사항 및 알림
- **설명**: 사용자는 알림 페이지를 통해 공지사항 및 알림을 카테고리 별로 확인 가능
- **전제조건**: 알람을 확인하기 위해 유저의 로그인 필요
- **트리거**: 메인 화면에서 공지 사항 및 로그인 후 알림 확인 가능
- **성공 후 조건**: 사용자는 메인화면에서 공지 사항 및 로그인 후 알림 확인 가능
- **주요 흐름**:
   1. 메인 화면에서 공지사항 확인가능
   2. 유저가 로그인함
   3. 메인 화면에서 유저가 개인이 받은 알람을 확인 가능
   4. 수신한 알림을 확인

---

## 3. 클래스 다이어그램 (Class Diagram)

이 장에서는 StarBooks 시스템의 클래스 다이어그램을 다양한 관점에서 제시한다.

### 3.1. 데이터베이스 클래스 다이어그램

데이터베이스의 구조를 나타내는 클래스 다이어그램으로, 주요 엔티티와 관계를 표현한다.

#### 주요 클래스:

**User**
- **속성**: userId:String, password:String, nickname:String, email:String, profileImage:String, createdAt:LocalDateTime, isActive:boolean
- **설명**: 시스템 사용자의 기본 정보를 저장하는 클래스

**UserProfile**
- **속성**: userId:String, introduction:String, favoriteAuthors:List<String>, favoriteGenres:List<String>
- **설명**: 사용자 자기소개 및 선호 정보

**Book**
- **속성**: bookId:Long, title:String, author:String, publisher:String, isbn:String, publishDate:LocalDate, coverImage:String, description:String
- **설명**: 도서 정보를 저장하는 클래스

**ReadingRecord**
- **속성**: recordId:Long, userId:String, bookId:Long, rating:int, review:String, favoriteQuote:String, readingStatus:Enum, progressPercent:int, startDate:LocalDate, endDate:LocalDate
- **설명**: 사용자의 독서 기록을 저장하는 클래스

**BookReview**
- **속성**: reviewId:Long, userId:String, bookId:Long, rating:int, reviewContent:String, createdAt:LocalDateTime
- **설명**: 리뷰 및 별점 정보 (독립 엔티티)

**BookShelf**
- **속성**: shelfId:Long, userId:String, shelfType:Enum, books:List<Book>
- **설명**: 내 서재 탭별 도서 목록 (읽는 중/완독/찜 등)

**BookWishlist**
- **속성**: wishlistId:Long, userId:String, bookId:Long, addedAt:LocalDateTime
- **설명**: 사용자의 찜 도서 목록

**Challenge**
- **속성**: challengeId:Long, title:String, description:String, targetBooks:int, startDate:LocalDate, endDate:LocalDate, creatorId:String
- **설명**: 독서 챌린지 기본 정보

**ChallengeParticipation**
- **속성**: participationId:Long, challengeId:Long, userId:String, progress:int, isCompleted:boolean
- **설명**: 챌린지 참가자 및 진행률

**Community**
- **속성**: postId:Long, authorId:String, bookId:Long, postType:Enum, title:String, content:String, createdAt:LocalDateTime
- **설명**: 커뮤니티 게시글 정보

**Comment**
- **속성**: commentId:Long, postId:Long, userId:String, content:String, createdAt:LocalDateTime
- **설명**: 게시글 댓글

**Goal**
- **속성**: goalId:Long, userId:String, goalType:Enum, targetBooks:int, achievedBooks:int, startDate:LocalDate, endDate:LocalDate
- **설명**: 독서 목표 관리

**ReadingCalendar**
- **속성**: calendarId:Long, userId:String, date:LocalDate, pagesRead:int, goalAchieved:boolean
- **설명**: 독서 캘린더용 데이터

**Friend**
- **속성**: friendId:Long, requesterId:String, receiverId:String, status:Enum, createdAt:LocalDateTime
- **설명**: 친구 요청/수락 관계

**Notification**
- **속성**: notificationId:Long, userId:String, type:Enum, message:String, isRead:boolean, createdAt:LocalDateTime
- **설명**: 사용자 알림 정보

**Announcement**
- **속성**: announcementId:Long, title:String, content:String, createdAt:LocalDateTime, authorId:String
_ **설명**: 시스템 공지사항

**SearchHistory**
- **속성**: searchId:Long, userId:String, keyword:String, searchedAt:LocalDateTime
- **설명**: 사용자 검색 기록

**PurchaseLink**
- **속성**: linkId:Long, bookId:Long, siteName:String, url:String
- **설명**: 도서 외부 구매 링크

**Ranking**
- **속성**: rankingId:Long, userId:String, rankPosition:int, rankingType:Enum, value:int
- **설명**: 독서 통계 기반 사용자 랭킹


### 3.2. 도메인 클래스 다이어그램

비즈니스 도메인의 핵심 개념을 표현하는 클래스들과 그들 간의 관계를 나타낸다.

**BookShelf**
- **속성**: books:List<Book>, filterType:Enum, count:int
- **설명**: 내 서재의 도서 집합을 관리하는 비즈니스 객체

**Goal**
- **속성**: progressRate:double, remainingDays:int
- **설명**: 독서 목표 달성률 계산 등 비즈니스 로직 포함

**Ranking**
- **속성**: userRank:int, booksRead:int, totalPages:int, streakDays:int
- **설명**: 통계·순위 계산용 도메인 모델

**ReadingCalendar**
- **속성**: dailyStats:Map<LocalDate,Integer>, achievedGoals:Set<LocalDate>
- **설명**: 독서량/목표 달성 현황을 집계

**UserProfile**
- **속성**: readingLevel:int, activityScore:int
- **설명**: 사용자의 활동도, 랭킹, 선호 기반 모델링

### 3.3. 서비스 레이어 클래스 다이어그램

비즈니스 로직을 처리하는 서비스 클래스들의 구조를 나타낸다.

**UserService**
- **속성**: registerUser(User user), loginUser(String id, String pw), updateProfile(UserProfile profile), getUserInfo(String id)
- **설명**: 회원가입·로그인·프로필 수정 처리

**BookService**
- **속성**: searchBooks(String keyword), getBookDetails(Long bookId), addBookToShelf(Long bookId, String userId), removeBookFromShelf()
- **설명**: 도서 검색 및 상세 보기

**ReadingService**
- **속성**: createReadingRecord(), updateReadingProgress(), getReadingStatistics(), calculateReadingGoals()
- **설명**: 독서 기록 작성/수정, 통계 계산

**ChallengeService**
- **속성**: createChallenge(), joinChallenge(), updateProgress()
- **설명**: 챌린지 생성 및 참여 관리

**CommunityService**
- **속성**: createPost(), editPost(), getPosts(), addComment()
- **설명**: 게시글/댓글 작성 및 관리

**FriendService**
- **속성**: addFriend(), acceptRequest(), removeFriend(), getFriendList()
- **설명**: 친구 관계 추가/삭제 관리

**GoalService**
- **속성**: setGoal(), updateGoalProgress(), getGoalStatus()
- **설명**: 독서 목표 설정 및 달성률 계산

**NotificationService**
- **속성**: sendNotification(), getNotifications(), markAsRead()
- **설명**: 알림 생성 및 읽음 처리
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
- **헤더**
- 스타북스의 로고
  ![Image](https://github.com/user-attachments/assets/f24a0f41-75a1-4943-8d50-77563c4dbd59)
- 메인 검색바
  ![Image](https://github.com/user-attachments/assets/e6a51231-81a1-42b2-8a93-42f9aecd7283)
- 사용자 메뉴
  ![Image](https://github.com/user-attachments/assets/c65c3492-c19e-4b9b-b010-e80bdeb76285)
- 네비게이션
  ![Image](https://github.com/user-attachments/assets/0d321ade-7f94-4c56-8e05-eeccad9496ea)
- 랭킹
  ![Image](https://github.com/user-attachments/assets/b7868003-96af-4e18-a5d9-244ec2e85f20)
- **콘텐츠 영역**
- 인기 도서
  ![Image](https://github.com/user-attachments/assets/a517da47-9189-4eca-9fdf-259b62cd4954)
- 최근 활동
  ![Image](https://github.com/user-attachments/assets/4002d48d-b11f-4c43-b6a5-d598e19bddf5)

### 6.2. 내 서재 화면
- **독서 목표**
- 일일/월간 독서 목표 설정 및 진행률
  ![Image](https://github.com/user-attachments/assets/b38a9273-623f-4fbc-8497-0181be547be3)
- **도서 목록**
- 읽고 있는 도서
  ![Image](https://github.com/user-attachments/assets/d938bbb0-b324-4355-988f-867da1e88a6c)
- 읽은 도서
  ![Image](https://github.com/user-attachments/assets/b3407938-0aec-4680-bfa2-94ba4a65f44e)
- 찜한 도서 탭
  ![Image](https://github.com/user-attachments/assets/bf8bd5e2-31f3-4621-a229-4712454bb794)
- **독서 캘린더**
- 월별 독서 활동 현황
  ![Image](https://github.com/user-attachments/assets/70ee35e8-8297-4d53-87fe-22a5cdb821fa)
- **독서 통계**
- 독서 권수와 페이지 수
  ![Image](https://github.com/user-attachments/assets/f25145e1-b41e-4428-b430-4f90cb80cf34)
  
### 6.3. 도서 상세 화면
- 도서 정보
  ![Image](https://github.com/user-attachments/assets/ce69b857-b4c5-4a42-8cc4-67fa04f6f7f4)
- 평점 및 리뷰
  ![Image](https://github.com/user-attachments/assets/e41a93b5-f67b-4037-abd3-7c523e339afb)
  
  
- 액션 버튼
  ![Image](https://github.com/user-attachments/assets/cb9a1582-d014-42f7-9978-6f4cf741fbe7)

### 6.4. 커뮤니티 화면
- **게시글 목록**
- 퀴즈
  ![Image](https://github.com/user-attachments/assets/09c451ed-be05-403c-abaf-16edfdee7526)
- 투표
  ![Image](https://github.com/user-attachments/assets/95073732-8ab4-41a8-9abe-bf9e75e8a3ec)
- 토론 게시글
  ![Image](https://github.com/user-attachments/assets/987867e4-6efc-482e-9897-5699aeaaa8a2)
- 게시글 작성
  ![Image](https://github.com/user-attachments/assets/88cd492a-b5f9-4dc8-a5b0-84b34e044c6a)

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
