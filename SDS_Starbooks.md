# 2. SDS (Software Design Specification)
## StarBooks
### Team members
|student ID|Name|
|:---|:---|
|22110825|최범수|
|22012167|김건희|
|22112057|박지훈|
|22210731|오세은|
|22112039|조영채|
|21622137|최재영|
---

## Revision history
|Revision date|Version #|Description|
|:---|:---|:---|
| 2025-10-28 | 1.0 | 최초 작성 |
| 2025-10-29 | 1.1 | 내용 및 유스케이스 분석 추가 |
| 2025-11-04 | 1.2 | 시퀀스,상태기계 다이어그램 및 사용자 인터페이스 프로토타입 추가 |
| 2025-11-05 | 1.3 | 클래스 다이어그램 추가 |
| 2025-12-06 | 1.4 | 기능 변경사항 수정 및 문서 내용 추가(use case까지) |

---

## Contenents
1. [Introduction](#1-Introduction)
2. [Use case analysis](#2-use-case-analysis)
3. [Class diagram](#3-class-diagram)
   - 3.1. [DB Class diagram](#31-db-class-diagram)
   - 3.2. [Domain Class diagram](#32-domain-class-diagram)
   - 3.3. [Service Layer Class diagram](#33-service-layer-class-diagram)
4. [Sequence diagram](#4-sequence-diagram)
5. [State machine diagram](#5-state-machine-diagram)
6. [User interface prototype](#6-user-interface-prototype)
7. [Implementation requirements](#7-implementation-requirements)
8. [Glossary](#8-glossary)
9. [References](#9-references)

---

## 1. Introduction

 본 문서는 StarBooks 독서 기록 관리 웹 서비스 시스템의 Design Specification(SDS)이다. 이 문서는 기존에 식별된 기능적 요구사항을 바탕으로 시스템을 여러 관점에서 설계하고 분석한다. Use case analysis는 사용자 관점에서 소프트웨어가 제공하는 기능을 서술하였고, Class diagram은 시스템의 구조적 관점을, Sequence diagram은 시스템의 동적 관점을 표현, State machine diagram은 시스템 상태 변화를 모델링하여 묘사하였다. User Interface는 사용자 인터페이스 관점에서 시스템을 설계한다.

 StarBooks는 사용자가 독서 목표를 설정하고 꾸준히 책을 읽을 수 있도록 지원하며, 자신의 독서 습관을 분석하고 발전시킬 수 있도록 돕는 것을 목적으로 한다. 사용자는 자신의 독서 목표를 자유롭게 설정하고 독서 기록을 관리하며, 다른 사용자와 함께 공동 목표를 달성하기 위한 독서 챌린지 참여 및 랭킹 시스템 등을 통해 지속적인 동기 부여를 받아 다른 사용자와 함께 독서를 즐기며 소통하는 풍부한 독서 경험을 누릴 수 있도록 한다. 이를 위하여 웹 서비스로서 프론트엔드는 React 기반, 백엔드는 Spring Boot 기반, 데이터베이스로는 MySQL을 채택하여 설계한다. 

---

## 2. Use case analysis

 이번 장에서는 use case diagram과 use case description을 제공한다. 

### 2.1. Use case Diagram

![usecase](https://github.com/The-gallery-00/starbooks/blob/main/state%20machine%20diagram/usecase.png)

### 2.2. Use case Description

| Use case #1 | Register |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 시스템의 이용자가 되기 위한 절차이며 모든 사용자는 사용에 앞서 회원가입을 해야 한다. |
| Scope | Starbooks |
| Level | User level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | Actor |
| Preconditions | 사용자는 웹 서비스에 접속한 상태여야 한다. |
| Trigger | 사용자가 첫 화면에서 회원가입 버튼을 클릭할 때 |
| Success Post Condition | 등록한 정보로 로그인할 수 있다. |
| Failed Post Condition | 회원가입이 완료되지 않으며, 사용자는 서비스를 이용할 수 없다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자가 회원가입을 한다. |
| 1 | 사용자는 첫 화면에서 회원가입 버튼을 클릭한다. |
| 2 | 시스템은 회원가입 화면을 표시한다. |
| 3 | 사용자는 이름, 이메일, 비밀번호, 비밀번호 확인, 닉네임을 입력 후 회원가입 버튼을 누른다. |
| 4 | 시스템은 입력한 정보의 유효성을 검사한다. |
| 5 | 시스템은 이메일과 닉네임의 중복 확인을 검사한다. |
| 6 | 모든 정보가 유효하고 중복이 없다면, 시스템은 회원 정보를 저장하고 회원가입을 완료한다. |
| 7 | 시스템은 완료 메시지를 표시하고 로그인 화면으로 이동시킨다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 4 | 4a. 입력값 유효성 실패|
|   | ...4a1. 사용자가 입력 칸을 비워두었거나 형식이 잘못된 경우, 중복 확인을 하지 않은 경우 오류 메시지를 표시한다.|
| 5 | 5a. 이메일 또는 닉네임 중복 |
|   | ...5a1. "이미 사용중인 이메일" 메시지를 표시하고 다른 이메일 입력을 요구한다.|
|   | ...5a2. "중복된 닉네임" 메시지를 표시하고 다른 닉네임 입력을 요구한다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 사용자당 1번 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #2 | Login/Logout |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 서비스에 이용하기 위하여 로그인하고, 이용 종료를 위한 로그아웃 과정이다. 로그인을 완료한 사용자는 모든 서비스를 이용할 수 있다. |
| Scope | Starbooks |
| Level | User level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 이미 회원가입을 완료한 상태여야 한다. |
| Trigger | 사용자가 로그인 화면에서 로그인 버튼을 클릭할 때, 로그인된 상태에서 로그아웃 버튼을 클릭할 때 |
| Success Post Condition | 로그인: 사용자가 서비스 기능을 이용할 수 있다. / 로그아웃: 로그아웃이 완료되고 인트로 화면으로 돌아간다. |
| Failed Post Condition | 로그인 실패 시 서비스에 접근할 수 없다. / 로그아웃에 실패한다.|
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자가 서비스 이용을 위해 로그인하려 한다. |
| 1 | 사용자는 로그인 화면에서 이메일과 비밀번호를 입력한 후 로그인 버튼을 누른다. |
| 2 | 시스템은 사용자 정보를 체크하여 로그인 성공 유무를 판단한다. |
| 3 | 시스템은 등록된 사용자라면 로그인에 성공하고 홈 화면을 제공한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 1 | 1a. 인증 실패 |
|   | ...1a1. 시스템은 "이메일 또는 비밀번호가 올바르지 않습니다."라는 오류 메시지를 출력한다. |
| 3 | 3a. 로그아웃 |
|   | ...3a1. 사용자는 상단 메뉴에서 로그아웃 버튼을 클릭한다. |
|   | ...3a2. 시스템은 사용자를 로그아웃 시키고 인트로 화면으로 이동시킨다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 사용자당 1번 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #3 | Manage Reading Goal |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 자신의 일일 독서 목표를 페이지 단위로 설정하고 조회하며 수정하는 기능이다. 목표 진행률도 확인할 수 있다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인한 상태여야 한다. |
| Trigger | 사용자가 내 서재에서 독서 목표 설정 버튼을 선택했을 때 |
| Success Post Condition | 사용자의 독서 목표가 정상적으로 설정, 수정 또는 조회된다. |
| Failed Post Condition | 목표 설정 또는 수정 실패한다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 자신의 독서 목표를 설정하거나 확인하려 한다. |
| 1 | 사용자는 내 서재 페이지로 이동한다. |
| 2 | 시스템은 현재 설정된 목표를 불러와 화면에 표시한다. |
| 3 | 사용자는 목표 설정 버튼을 클릭하여 목표를 수정하거나, 설정된 목표에 대한 현재 진행상태를 업데이트한다. |
| 4 | 시스템은 입력된 목표 정보 및 현재 진행상태를 저장한다. |
| 5 | 시스템은 목표 진행률을 갱신하여 사용자에게 표시한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 2 | 2a. 목표 데이터 없음 |
|   | ...2a1. 시스템은 “설정된 목표가 없습니다.”를 표시하고 목표 입력을 권유하는 메시지를 표시한다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #4 | Reading Calendar |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 독서 캘린더를 통해 자신이 설정한 목표에 달성한 날짜를 시각적으로 확인할 수 있다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. 설정한 독서 목표가 있어야 한다. |
| Trigger | 사용자가 홈 화면 또는 내 서재 페이지로 이동하였을 때 |
| Success Post Condition | 목표 달성일이 성공적으로 캘린더에 표시된다. |
| Failed Post Condition | 목표 달성일이 캘린더에 표시되지 못한다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 독서 캘린더에서 자신의 목표 달성일을 확인려 한다. |
| 1 | 사용자는 홈 화면 또는 내 서재 페이지로 이동한. |
| 2 | 시스템은 독서 캘린더 영역에 목표 달성일을 표시한다.|
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second|
| Frequency | 제한 없음 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #5 | Integrated search |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 서비스 내 다양한 정보를 통합 검색하는 기능이다. 검색 대상에는 도서, 챌린지, 커뮤니티 글 항목들로 포함한다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. |
| Trigger | 사용자가 상단 돋보기 검색 영역에서 검색창에 키워드를 입력하여 엔터를 입력하였을 때 |
| Success Post Condition | 연관된 검색 결과가 정상적으로 사용자에게 표시된다. |
| Failed Post Condition | 검색 결과가 잘못 표시되거나 오류 메시지를 출력한다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자가 원하는 정보를 찾기 위해 통합 검색을 수행하려 한다. |
| 1 | 사용자는 검색창에 검색 키워드를 입력하여 엔터를 입력한다. |
| 2 | 시스템은 입력된 키워드를 기반으로 도서, 챌린지, 커뮤니티 범위에서 검색을 수행한다. |
| 3 | 시스템은 검색 결과를 사용자에게 표시한다. |
| 4 | 사용자는 원하는 결과를 선택하여 상세 페이지로 이동한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 3 | 3a. 검색 결과 없음 |
|   |...3a1. 시스템은 "검색 결과가 없습니다." 메시지를 표시한다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 5 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #6 | Search Book Information |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 도서 정보 페이지에서 원하는 도서를 검색하기 위해 키워드를 입력하고 검색 결과 목록을 확인하며, 원하는 도서를 선택하여 상세 정보를 조회하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. 시스템은 외부 API 연동을 유지하고 있어야 한다.|
| Trigger | 사용자가 도서 정보 페이지로 이동하여 검색창에 키워드를 입력했을 때 |
| Success Post Condition | 해당 검색 키워드와 일치하는 도서 목록이 사용자에게 정상적으로 표시된다. |
| Failed Post Condition | 검색 오류 발생 시 시스템은 “검색 결과가 없습니다.” 또는 오류 메시지를 출력한다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 원하는 도서를 찾기 위해 도서 검색 기능을 사용하려 한다. |
| 1 | 사용자는 도서 정보 페이지의 검색창에 도서명, 저자명 등 검색어를 입력한다. |
| 2 | 시스템은 입력된 검색어를 기반으로 도서 데이터를 조회하고, 검색 결과로 일치하는 도서 목록을 출력한다. |
| 3 | 사용자는 검색 결과 목록 중 원하는 도서를 선택한다. |
| 4 | 시스템은 선택된 도서의 상세 페이지로 이동시킨다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 1 | 1a. 검색어 입력 전 |
|   | ...1a1. 인기 도서 목록을 보여준다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 10 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음|
| Due Date | |

| Use case #7 | View Popular Books |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 시스템이 제공하는 인기 도서 목록을 확인하고, 해당 도서 상세 정보를 조회하는 기능이다. 인기 도서는 외부 API를 통해 최신 상태로 유지된다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. 시스템은 외부 API 연동된 상태여야 한다. |
| Trigger | 사용자가 홈 화면 또는 도서 정보 페이지로 이동하였을 때 |
| Success Post Condition | 인기 도서 목록이 사용자에게 정상적으로 표시된다. |
| Failed Post Condition | 오류 발생 시 인기 도서 목록이 표시되지 않는다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 현재 인기 있는 도서를 확인하기를 원한다. |
| 1 | 사용자는 홈 화면 또는 도서 정보 페이지에서 인기 도서 영역을 확인한다. |
| 2 | 시스템은 외부 API에서 수집된 인기 도서 데이터를 기반으로 정렬된 목록을 사용자에게 보여준다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 10 seconds |
| Frequency | 제한 없음 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #8 | View Book Details |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 특정 도서를 선택했을 때, 해당 도서의 상세 정보(제목, 저자, 출판사, 책 소개)를 조회하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. |
| Trigger | 사용자가 특정 도서를 클릭했을 때 |
| Success Post Condition | 도서 상세 정보가 화면에 정상적으로 표시된다. |
| Failed Post Condition | 도서 정보를 불러올 수 없어 정보를 확인할 수 없다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 선택한 도서에 대한 상세 정보를 확인하려 한다. |
| 1 | 사용자는 도서 목록 등에서 특정 도서를 클릭한다. |
| 2 | 시스템은 해당 도서의 상세 데이터를 불러와 사용자에게 제목, 저자, 출판사, 표지, 책 소개 정보를 표시한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 2 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #9 | Manage Book List |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 내 서재에서 자신의 도서 목록을 조회하고, 목록에 도서를 추가하거나 찜하기 기능을 통해 관심 도서를 관리하는 기능이다. 이 기능은 View Book Details에서 제공하는 버튼을 통해 관리되어 내 서재 페이지에서 조회가 가능하다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인된 상태여야 한다. |
| Trigger | 사용자가 내 서재 페이지로 이동하였을 때, 도서 상세 페이지에서 찜하기와 추가하기 버튼을 선택했을 때 |
| Success Post Condition | 사용자의 도서 목록이 정상적으로 불러와지고, 수정사이 반영된다. |
| Failed Post Condition | 도서 목록을 정상적으로 표시할 수 없다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 자신의 도서 목록을 조회하거나 관리하려 한다. |
| 1 | 사용자는 내 서재 페이지로 이동한다. |
| 2 | 시스템은 사용자의 도서 목록 데이터를 불러와 카테고리(읽고 있는 도서, 읽은 도서, 찜한 도서)에 맞게 화면에 표시한다. |
| 3 | 사용자는 목록에서 도서를 확인하고, 필요 시 상세 페이지로 이동하여 도서를 추가하거나 찜하기를 선택한다. |
| 4 | 시스템은 선택한 도서를 사용자 도서 목록에 반영한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 2 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #10 | Manage Reading Progress |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 특정 도서의 진행률을 설정하거나 수정하여 자신의 독서 진행 상황을 관리하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. 사용자는 자신의 서재에 해당 도서를 이미 추가한 상태여야 한다. |
| Trigger | 사용자가 도서 상세 페이지에서 진행률 수정 버튼을 선택했을 때 |
| Success Post Condition | 도서 진행률이 정상적으로 저장되고, 진행률 그래프에 즉시 반영된다. |
| Failed Post Condition | 진행률 값이 저장되지 않는다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 선택한 도서의 독서 진행률을 설정하거나 수정하려 한다. |
| 1 | 사용자는 진행률 수정 버튼을 누른다. |
| 2 | 사용자는 전체 페이지 수와 진행 페이지 수를 입력한다. |
| 3 | 시스템은 진행률 데이터를 저장한 뒤 업데이트된 진행률을 화면에 표시한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 2 | 2a. 진행률 설정 전|
|   | ...2a1. "아직 진행률이 설정되지 않았습니다. 진행률 설정으로 나의 도서 진행률을 확인해보세요!" 메시지를 표시한다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 필요 시|
| < Concurrency > | 제한 없 |
| Due Date | |

| Use case #11 | Manage Reading Records |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 특정 도서에 대해 독서 기록(도서평, 별점, 좋아하는 구절)을 작성하고 삭제하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. 사용자는 해당 도서를 자신의 서재에 보유하고 있어야 한다. |
| Trigger | 사용자가 도서 상세 페이지에서 독서 기록 작성 버튼을 누를 때, 독서 기록의 삭제 버튼을 누를 때|
| Success Post Condition | 독서 기록이 정상적으로 작성, 삭제된다. |
| Failed Post Condition | 독서 기록이 저장되지 않거나 삭제되지 않는다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 특정 도서에 대한 독서 기록을 작성하거나 관리하려 한다. |
| 1 | 사용자는 도서 상세 페이지에서 독서 기록 작성 버튼을 선택한다. 삭제를 원할 경우 삭제 버튼을 누른다. |
| 2 | 사용자는 도서평, 별점, 좋아하는 구절을 입력하고 작성하기 버튼을 누른다. |
| 3 | 시스템은 기록 정보를 검증하고 저장한다. |
| 4 | 저장한 기록이 관련 페이지에 즉시 갱신되어 표시된다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 제한 없 |
| < Concurrency > | 제한 없음|
| Due Date | |

| Use case #12 | View Ratings & Reviews |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 특정 도서에 대해 다른 사용자들이 남긴 독서 기록을 조회하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. |
| Trigger | 사용자가 도서 상세 페이지에서 사용자 도서평 영역을 확인할 때 |
| Success Post Condition | 사용자에게 해당 도서의 도서평 목록이 상적으로 표시된다.|
| Failed Post Condition | 도서평을 조회할 수 없다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 특정 도서에 대한 다른 사용자들의 도서를 확인하려 한다. |
| 1 | 사용자는 도서 상세 페이지에서 도서평 영역으로 이동한다. |
| 2 | 시스템은 해당 도서에 등록된 도서평 데이터를 조회하고 사용자에게 표시한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 2 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #13 | Go to Purchase Page |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 도서 상세 페이지에서 제공되는 구매하러 가기 버튼을 클릭하여 외부 서점 사이트로 이동하는 기능이다.|
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. |
| Trigger | 사용자가 도서 상세 페이지에서 구매하러 가기 버튼을 클릭할 때 |
| Success Post Condition | 사용자는 해당 도서 제목으로 검색된 외부 서점의 도서 구매 페이지로 정상적으로 이동한다. |
| Failed Post Condition | 외부 사이트에 접속하지 못한다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 해당 도서를 구매하기 위해 구매 페이지로 이동하려 한다. |
| 1 | 사용자는 도서 상세 페이지에서 구매하러 가기 버튼을 클릭하여 원하는 외부 서점 사이트를 선택한다. |
| 2 | 시스템은 도서에 연결된 외부 서점 링크를 확인하고 사용자를 해당 링크로 이동시킨다. |
| 3 | 사용자는 해당 도서로 검색된 외부 사이트에서 구매 절차를 진행할 수 있다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 5 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #14 | Create Challenge |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 새로운 독서 챌린지를 생성하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인된 상태여야 한다. |
| Trigger | 사용자가 챌린지 페이지에서 챌린지 생성 버튼을 클릭할 때 |
| Success Post Condition | 새로운 챌린지가 정상적으로 생성되고 챌린지 목록에 표시된다. |
| Failed Post Condition | 챌린지가 생성할 수 다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 새로운 독서 챌린지를 만들고자 한다. |
| 1 | 사용자는 챌린지 생성 버튼을 클릭한다. |
| 2 | 시스템은 챌린지 생성 양식(챌린지 제목, 내용, 마감일, 목표권수)을 사용자에게 보여준다. |
| 3 | 사용자는 입력한 내용을 확인한 후 생성하기 버튼을 선택한다. |
| 4 | 시스템은 챌린지를 생성하고 챌린지 목록을 갱신한다.|
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 3 | 3a. 입력 정보 누락 |
|   | ...3a1. 시스템은 "정보를 모두 입력해주세요" 메시지를 표시하고 입력을 요청한다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 2 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없|
| Due Date | |

| Use case #15 | Participate/Cancel Challenge |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 특정 독서 챌린지에 참여하거나 이미 참여한 챌린지를 취소하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인되어 있어야 한다. |
| Trigger | 사용자가 챌린지 페이지에서 참여하기 버튼을 클릭했을 때, 참여 취소 버튼을 클릭했을 때 |
| Success Post Condition | 참여하기: 사용자가 챌린지 참여자로 등록된다. / 참여취소: 사용자의 챌린지 참여 기록이 삭제된다. |
| Failed Post Condition | 참여/취소가 정상적으로 처리되지 않는.|
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 특정 챌린지에 참여하거나 취소하고자 한다. |
| 1 | 사용자는 챌린지 페이지에서 참여하기 버튼을 클릭한다. |
| 2 | 시스템은 사용자의 기존 참여 여부를 확인하고 사용자 참여 기록을 추가한다. |
| 3 | 사용자는 참여중인 챌린지 목록에서 자신이 참여한 챌린지 목록을 확인할 수 있다. |
| 4 | 사용자가 참여중인 챌린지 목록에서 참여 취소 버튼을 클릭한다. |
| 5 | 시스템은 사용자의 참여 상태를 확인하고 사용자 참여 기록을 삭제한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 2 seconds|
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #16 | View Rankings |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 전체 서비스 내의 다독 순위 및 챌린지 인기 순위를 조회하는 기능이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인된 상태여야 한다. |
| Trigger | 사용자가 랭킹 페이지를 선택할 때 |
| Success Post Condition | 사용자는 랭킹 정보를 정상적으로 확인한다. |
| Failed Post Condition | 랭킹 정보를 불러오지 못한다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 전체 서비스 내 다독 순위 및 챌린지 인기 순위를 조회하고, 자신의 다독순위를 조회하려 한다. |
| 1 | 사용자는 랭킹 페이지로 이동한다. |
| 2 | 시스템은 랭킹 데이터 받아와 화면에 표시한. |
| 3 | 사용자는 자신의 순위 및 다른 사용자들의 순위, 챌린지 인기 순위를 확인할 수 있다.|
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 2 seconds|
| Frequency | 제한 없음 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #17 | Manage Posts/Comments |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 커뮤니티 글을 작성하거나 삭제할 수 있으며, 글에 대해 댓글을 작성할 수 있다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인된 상태여야 한다. 글 삭제의 경우, 사용자가 해당 글의 작성자여야 한다. 댓글의 경우, 작성된 글이 존재해야 한다. |
| Trigger | 사용자가 커뮤니티 화면에서 작성하기 버튼을 선택할 때, 자신이 작성한 글에 대해 삭제 버튼을 클릭할 때, 댓글 작성 버튼을 클릭할 때|
| Success Post Condition | 게시글이 성공적으로 작성되어 커뮤니티 목록에 표시된다. 게시글이 정상적으로 삭제된다. 댓글이 정상적으로 등록된다. |
| Failed Post Condition | 게시글 작성 또는 삭제가 이루어지지 않는다. 댓글이 등록되지 않는다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 커뮤니티에 글을 작성하거나 기존 글을 삭제하려 한다. |
| 1 | 사용자는 커뮤니티 화면으로 이동하여 글 작성 버튼을 클릭한다. |
| 2 | 사용자는 원하는 커뮤니티 양식(퀴즈/투표/토론)에 따라 제목, 내용을 입력한 후 작성하기 버튼을 누른다.|
| 3 | 시스템은 게시글의 유효성을 검사하고 저장 후 커뮤니티 목록에 반영한다. |
| 4 | 사용자는 업데이트된 커뮤니티 목록을 볼 수 있으며, 해당 커뮤니티 글에 대해 상세 화면으로 이동할 수 있다.
| 5 | 사용자는 댓글 등록 버튼을 클릭하여 댓글을 작성한다. |
| 6 | 시스템은 작성된 댓글을 등록하여 글 상세 페이지에 표시한다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 4 | 4a. 글 삭제 |
|   | ...4a1. 사용자는 자신이 작성한 글에 대해 삭제 버튼을 클릭한다. |
|   | ...4a2. 시스템은 삭제 여부를 확인하는 메시지를 표시하고, 확정되면 게시글을 삭제하고 목록을 갱신한다. |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 사용자당 하루 0~30회, 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #18 | Manage Notifications |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 서비스에서 제공하는 알림을 확인하는 기능이다. 알림에는 친구 요청, 댓글 알림, 챌린지 알림 등이 포함된다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인된 상태여야 한다. |
| Trigger | 사용자가 상단의 알림 페이지를 클릭할 때 |
| Success Post Condition | 사용자는 알림을 성공적으로 확인하거나 읽음 처리할 수 있다. |
| Failed Post Condition | 알림을 성공적으로 불러올 수 없다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 알림을 조회하거나 읽음처하려 한다. |
| 1 | 사용자가 상단의 알림 페이지를 클릭한다. |
| 2 | 시스템은 사용자 계정에 해당하는 알림 목록을 불러온다. |
| 3 | 사용자는 알림 목록에서 새로운 알림들을 확인하고, 특정 알림을 선택하여 읽음 상태로 변경할 수 있다.|
| 4 | 이 Use Case는 알림이 정상적으로 조회/읽음처리할 수 있으면 종료된다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second|
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #19 | Manage Profile |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 자신의 프로필을 조회하거나 수정하는 과정이다. 프로필에는 닉네임, 소개글 등 기본 정보가 포함되며 사용자는 이를 마이페이지에서 변경할 수 있다. 설정한 프로필을 다른 사용자가 조회할 수 있다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인한 상태여야 한다. |
| Trigger | 사용자가 마이페이지에서 프로필 설을 클릭했을 때 |
| Success Post Condition | 프로필 정보가 변경되거나 최신 상태로 표시된다. |
| Failed Post Condition | 프로필 수정이 실패하면 기존 정보가 유지된다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자가 자신의 프로필을 확인하거나 수정하려 한다. |
| 1 | 사용자는 마이페이지에서 프로필 설정 페이지로 이동한다. |
| 2 | 시스템은 프로필 정보(닉네임, 소개글 등)를 화면에 표시한다. |
| 3 | 사용자는 기존 정보에서 수정하기를 원하는 항목을 변경한 후 수정 버튼을 누른다. |
| 4 | 시스템은 변경된 프로필 정보를 DB에 반영하고 성공 메시지를 보여준다. |
| 5 | 사용자는 업데이트된 프로필을 확인할 수 있다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 3 | 3a. 닉네임 중복 |
|   | ...3a1. 시스템이 닉네임 중복을 감지하면 "이미 존재하는 닉네임" 메시지를 출력하고 재입력을 요구한다.|
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 사용자당 하루 5번 이하 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #20 | Manage Friends |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 친구 목록을 확인하고, 다른 사용자를 검색하여 친구 추가 요청을 보내고 받은 친구 요청을 수락 혹은 거절하는 전반적인 친구 관리 과정이다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis|
| Primary Actor | User |
| Preconditions | 사용자는 로그인한 상태여야 한다. |
| Trigger | 사용자가 친구 서재에서 친구 신청 버튼을 클릭할 때, 사용자가 마이페이지의 친구 목록 페이지로 이동할 때, 친구 검색 버튼을 클릭할 때 |
| Success Post Condition | 친구 목록이 최신 상태로 업데이트 된다. 친구 요청이 정상적으로 처리된다. |
| Failed Post Condition | 친구 요청 또는 수락/거절이 반영되지 않는다. 검색 중 오류가 발생한다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자가 친구 관리 기능을 이용하려 한다. |
| 1 | 사용자가 마이페이지에서 친구 목록을 클릭한다. |
| 2 | 시스템은 친구 수락 대기 목록과 현재 친구 목록을 함께 표시하고, 친구 검색 버튼을 제공한다. |
| 3 | 사용자는 친구 검색에서 다른 사용자 닉네임을 검색한다. |
| 4 | 시스템은 조건에 일치하는 사용자 목록을 보여준다. |
| 5 | 사용자는 원하는 사용자 프로필에서 친구 신청 버튼을 누른다. |
| 6 | 시스템은 친구 요청을 전송하고, 친구 수락 대기 목록에 추가한다. |
| 7 | 사용자는 친구 수락 대기 목록에서 요청을 확인하고, 수락 또는 거절 버튼을 누른다. |
| 8 | 시스템은 수락/거절 결과를 반영하여 친구 목록을 업데이트한다. |
| 9 | 업데이트된 친구 목록이 사용자에게 다시 표시된다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| 7 | 7a. 요청 수락 |
|   | ...7a1. 시스템은 양쪽 사용자 계정에 친구 관계를 생성한다. |
|   | 7b. 요청 거절 |
|   | ...7b1. 시스템은 해당 요청을 삭제하고, 친구 수락 대기 목록에서 해당 요청을 삭제한다.
| **RELATED INFORMATION** ||
| Performance | ≤ 1 second |
| Frequency | 사용자당 하루 10번 이하 |
| < Concurrency > | 제한 없음 |
| Due Date | |

| Use case #21 | View Other User’s Library |
|:---|:---|
| **GENERAL CHARACTERISTICS** |  |
| Summary | 사용자가 다른 사용자의 서재를 열람하는 기능이다. 사용자는 다른 사용자의 프로필, 도서 목록, 독서 기록을 확인할 수 있으며, 친구 신청을 보낼 수도 있다. |
| Scope | Starbooks |
| Level | User Level |
| Author | |
| Last Update | 2025/12/06 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자는 로그인 상태여야 한다. |
| Trigger | 사용자가 친구 목록 등에서 다른 사용자의 프로필을 클릭할 때 |
| Success Post Condition | 사용자는 다른 사용자의 서재 정보를 정상적으로 열람한다. |
| Failed Post Condition | 대상 사용자의 서재를 열람할 수 없다. |
| **MAIN SUCCESS SCENARIO** |  |
| Step |Action|
| S | 사용자는 다른 사용자의 서재를 확인하려 한다. |
| 1 | 사용자는 친구 목록 등에서 특정 사용자를 클릭한다. |
| 2 | 시스템은 해당 사용자의 프로필과 서재 정보를 불러와 화면에 표시한다. |
| 3 | 사용자는 다른 사용자가 읽은 도서, 읽고 있는 도서, 찜한 도서, 독서 기록 등을 확인한다. |
| 4 | 사용자는 친구 요청을 전송할 수 있으며, 요청 후 상태가 실시간으로 반영된다. |
| **EXTENSION SCENARIOS** ||
| Step | Branching Action |
| | |
| **RELATED INFORMATION** ||
| Performance | ≤ 2 seconds |
| Frequency | 필요 시 |
| < Concurrency > | 제한 없음 |
| Due Date | |

---

## 3. Class Diagram

이 장에서는 다양한 관점에서 바라본 Class diagram과 각각에 대한 설명을 작성한다.

### 3.1. DB Class Diagram

데이터베이스의 구조를 나타내는 클래스 다이어그램으로, 주요 엔티티와 관계를 표현한다.

![Database](https://github.com/The-gallery-00/starbooks/blob/main/class/DatabaseClass.png)


#### 주요 클래스:

**User**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| userId | String | 유저의 고유식별을 위한 속성이다 |
| password | String | 유저의 로그인에 필요한 password key를 저장하기 위한 속성이다 |
| nickname | String | 사용자가 설정한 닉네임을 저장하기위한 속성이다 |
| email | String | 유저 정보중 email정보를 저장하기 위한 속성이다 |
| profileImage | String | 사용자의 프로필 사진을 저장하기 위한 속성이다 |
| createdAt | LocalDateTime | 회원가입한 시각을 저장하기 위한 속성이다 |
| isActive | boolean | 유저의 활동상태를 저장하기 위한 속성이다 |
- **설명**: 시스템 사용자의 기본 정보를 저장하는 클래스

**UserProfile**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| userId | String | 유저의 고유식별을 위한 속성이다 |
| introduction | String | 유저가 자기소개란을 작성하기 위한 속성이다 |
| favoriteAuthors | List<String> | 유저가 좋아하는 저자를 서술하기 위한 속성이다 |
| favoriteGenres | List<String> | 유저가 좋아하는 장르를 서술하기 위한 속성이다 |
- **설명**: 사용자 자기소개 및 선호 정보

**Book**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| bookId | Long | 책의 고유식별을 위한 속성이다 |
| title | String | 책의 제목을 저장하기 위한 속성이다 |
| author | String | 책의 저자를 저장하기 위한 속성이다 |
| publisher | String | 책의 출판사를 저장하기 위한 속성이다 |
| isbn | String | 책의 13자리 국제 표준 도서 번호를 저장하기 위한 속성이다 |
| publishDate | LocalDate | 책의 출판일을 표시하기 위한 속성이다 |
| coverImage | String | 책커버의 이미지를 표시하기 위한 속성이다 |
| description | String | 책의 세부설명을 제공하기 위한 속성이다 |
- **설명**: 도서 정보를 저장하는 클래스

**ReadingRecord**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| recordId | Long | 사용자의 독서기록을 식별하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| bookId | Long | 책의 고유식별을 위한 속성이다 |
| rating | int | 책의 별점을 표시하기 위한 속성이다 |
| review | String | 사용자의 개인적인 리뷰를 저장하기 위한 속성이다 |
| favoriteQuote | String | 독자가 책의 좋아하는 인용구절을 다른사람과 공유하기 위한 속성이다 |
| readingStatus | Enum | 독자가 현재 기록에 대한 책읽은 상태를 표시하기 위한 속성이다 |
| progressPercent | int | 독자가 현재 책을 얼만큼 읽었는지를 보여주기위해 사용하는 속성이다 |
| startDate | LocalDate | 책을 처음 읽은날을 표시하기 위한 속성이다 |
| endDate | LocalDate | 책을 마지막으로 읽은날을 표시하기 위한 속성이다 |
- **설명**: 사용자의 독서 기록을 저장하는 클래스

**BookReview**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| reviewId | Long | 책리뷰에 대한 기록을 식별하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 | 
| bookId | Long | 책의 고유식별을 위한 속성이다 |
| rating | int | 책의 별점을 표시하기 위한 속성이다 |
| reviewContent | String | 다른사용자가 볼수있는 책의 리뷰를 저장하기 위한 속성이다 |
| createdAt | LocalDateTime | 리뷰를 생성한 날자를 저장하기 위한 속성이다 |
- **설명**: 리뷰 및 별점 정보 (독립 엔티티)

**BookShelf**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| shelfId | Long | 사용자의 서재 탭을 구분하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| shelfType | Enum | 서재 탭에서 제공하는 책에 표시에 관한 속성이다 |
| books | List<Book> | 책을 탭별 List로 사용자에게 제공하기 위한 속성이다 |
- **설명**: 내 서재 탭별 도서 목록 (읽는 중/완독/찜 등)

**Challenge**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| challengeId | Long | 독서 챌린지를 식별하기 위한 속성이다 |
| title | String | 독서 챌린지의 이름을 저장하기 위한 속성이다 |
| description | String | 독서 챌린지의 설명을 작성하기 위한 속성이다 |
| targetBooks | int | 독서 챌린지의 목표 책수를 표시하기 위한 속성이다 |
| startDate | LocalDate | 독서 챌린지의 시작일을 표시하기 위한 속성이다 |
| endDate | LocalDate | 독서 챌린지의 마감일을 표시하기 위한 속성이다 |
| creatorId | String | 독서 챌린지를 생성한 유저의 ID를 표시하기 위한 속성이다 |
- **설명**: 독서 챌린지 기본 정보

**ChallengeParticipation**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| participationId | Long | 독서 챌린지 참여자를 식별하기위한 코드이다 |
| challengeId | Long | 독서 챌린지를 식별하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| progress | int | 독서 챌린지의 진행도를 표시하기 위한 속성이다 |
| isCompleted | boolean | 독서 챌린지의 성공여부를 표시하기 위한 속성이다 |
- **설명**: 챌린지 참가자 및 진행률

**Community**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| postId | Long | 커뮤니티의 글을 식별하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| bookId | Long | 책의 고유식별을 위한 속성이다 |
| postType | Enum | 게시물의 타입을 구분하기 위한 속성이다 |
| title | String | 게시물의 제목을 저장하기 위한 속성이다 |
| content | String | 게시물의 내용을 저장하기 위한 속성이다 |
| createdAt | LocalDateTime | 게시물의 생성날짜를 저장하기 위한 속성이다 |
- **설명**: 커뮤니티 게시글 정보

**Comment**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| commentId | Long | 게시물에 대한 댓글을 식별하기 위한 속성이다 |
| postId | Long | 커뮤니티의 글을 식별하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 코드이다 |
| content | String | 게시물의 내용을 저장하기 위한 속성이다 | 
| createdAt | LocalDateTime | 게시물의 생성날짜를 저장하기 위한 속성이다 |
- **설명**: 게시글 댓글

**Goal**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| goalId | Long | 독서목표를 식별하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| goalType | Enum | 독서목표의 형식을 표시하기 위한 속성이다 |
| targetBooks | int | 독서수 목표를 표시하기 위한 속성이다 |
| achievedBooks | int | 독서수 목표를 달성한 양을 표시하기 위한 속성이다 |
| startDate | LocalDate | 목표 시작일을 표시하기 위한 속성이다 |
| endDate | LocalDate | 목표 마감일을 표시하기 위한 속성이다 |
- **설명**: 독서 목표 관리

**ReadingCalendar**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| calendarId | Long | 독서 켈린더를 식별하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| date | LocalDate | 켈린더에 날짜별 내용을 작성하기 위한 속성이다 |
| pagesRead | int | 켈린더에 표시할 읽은 page수를 표시하기 위한 속성이다 |
| goalAchieved | boolean | 사용자가 설정한 일간 목표의 달성여부를 표시하기 위한 속성이다 | 
- **설명**: 독서 캘린더용 데이터

**Friend**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| userId | String | 유저의 고유식별을 위한 속성이다 |
| requesterId | String | 친구요청을 한 사람을 식별하기 위한 속성이다 |
| receiverId | String | 친구요청을 받은 사람을 식별하기 위한 속성이다 |
| status | Enum | 친구신청 상태를 표시하기 위한 속성이다 |
- **설명**: 친구 요청/수락 관계

**Notification**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| notificationId | Long | 알림의 고유식별을 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| type | Enum | 알림의 속성을 표시하기 위한 속성이다 |
| message | String | 알림의 내용을 표시하기 위한 속성이다 |
| isRead | boolean | 알림의 읽었는지의 여부를 표시하기 위한 속성이다 |
| createdAt | LocalDateTime | 알림이 수신된 시간을 표시하기 위한 속성이다 |
- **설명**: 사용자에게 알림을 제공하기 위한 클래스

**Announcement**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| announcementId | Long | 공지사항을 식별하기 위한 속성이다 |
| title | String | 공지사항의 제목을 저장하기 위한 속성이다 |
| content | String | 공지사항의 내용을 저장하기 위한 속성이다 |
| createdAt | LocalDateTime | 공지사항이 생성된 날짜를 저장하기 위한 속성이다 |
| authorId | String | 해당 공지사항을 게시한 사람의 id를 확인하기 위한 속성이다 |
- **설명**: 시스템 공지사항

**SearchHistory**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| searchId | Long | 검색기록을 저장하기 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| keyword | String | 검색기록을 표시하기 위한 속성이다 |
| searchedAt | LocalDateTime | 검색기록의 시간을 저장하기 위한 속성이다 |
- **설명**: 사용자 검색 기록

**PurchaseLink**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| linkId | Long | 구매링크를 구분하기 위한 속성이다 |
| bookId | Long | 책의 고유식별을 위한 속성이다 |
| siteName | String | 구매링크의 사이트 명을 저장하기 위한 속성이다 |
| url | String | 구매링크를 제공하기 위해 url을 저장하기 위한 속성이다 |
- **설명**: 도서 외부 구매 링크

**Ranking**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| rankingId | Long | 랭킹을 고유식별을 위한 속성이다 |
| userId | String | 유저의 고유식별을 위한 속성이다 |
| rankPosition | int | 랭크 순위를 표시하기 위한 int타입의 속성이다 |
| rankingType | Enum | 랭킹의 타입을 지정하기 위한 속성이다 |
| value | int | 순위를 매길때 사용되는 실제 수치값을 저장하기 위한 속성이다 |
- **설명**: 독서 통계 기반 사용자 랭킹


### 3.2. Domain Class Diagram

비즈니스 도메인의 핵심 개념을 표현하는 클래스들과 그들 간의 관계를 나타낸다.

![domain](https://github.com/The-gallery-00/starbooks/blob/main/class/Domain.png)

**BookShelf**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| userId | String | 유저의 고유식별을 위한 속성이다 |
| books | List<Book> | 유저의 서재에 책을 저장하기 위한 속성이다 |
| filterType | Enum | 현재 유저가 서재에 책의 상태를 표시하기 위한 속성이다 |
| count | int | 유저의 서재의 책의 수를 카운트하기 위한 속성이다 |
- **설명**: 내 서재의 도서 집합을 관리하는 비즈니스 객체

**Goal**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| userId | String | 유저의 고유식별을 위한 속성이다 |
| progressRate | double | 독서 목표 진행률을 확인하기 위한 속성이다 |
| remainingDays | int | 독서 목표 달성의 남은날을 표시하기 위한 속성이다 |
- **설명**: 독서 목표 달성률 계산 등 비즈니스 로직 포함

**Ranking**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| userId | String | 유저의 고유식별을 위한 속성이다 |
| userRank | int | 유저의 랭킹을 표시하기 위한 속성이다 |
| booksRead | int | 유저가 읽은 책의 수를 저장하기 위한 속성이다 |
| totalPages | int | 유저가 총읽은 페이지수를 저장하기 위한 속성이다 |
| streakDays | int | 유저의 연속목표 달성일을 저장하기 위한 속성이다 |
- **설명**: 통계·순위 계산용 도메인 모델

**ReadingCalendar**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| calendarId | Long | 독서 켈린더를 식별하기 위한 속성이다 |
| dailyStats | Map<LocalDate,Integer> | 날짜별 책을 읽은 수를 표시하기 위한 속성이다 |
| achievedGoals | Set<LocalDate> | 달성일수를 표시하기 위한 속성이다 |
- **설명**: 독서량/목표 달성 현황을 집계

**UserProfile**
| 속성명 | 속성타입 | 속성설명 |
|:---|:---|:---|
| userId | String | 유저의 고유식별을 위한 속성이다 |
| friends | int | 유저의 친구수를 표시하기 위한 속성이다 |
| booksRead | int | 유저가 읽은 책의 수를 저장하기 위한 속성이다
| readingPage | int | 유저가 읽은 책의 페이지수를 저장하기 위한 속성이다 |
| activityScore | int | 유저의 독서 챌린지 달성수를 표시하기 위한 속성이다 |
| achievedGoals | Set<LocalDate> | 달성일수를 표시하기 위한 속성이다 |
| streakDays | int | 유저의 연속목표 달성일을 저장하기 위한 속성이다 |
- **설명**: 사용자의 활동, 랭킹, 선호 기반 모델링

### 3.3. Service Layer Class Diagram

비즈니스 로직을 처리하는 서비스 클래스들의 구조를 나타낸다.

![Service](https://github.com/The-gallery-00/starbooks/blob/main/class/Service.png)

**UserService**
| 메서드명 | 설명 |
|:---|:---|
| registerUser(User user) | 유저가 회원가입하기 위한 객체를 생성한다 |
| loginUser(String id, String pw) | 유저가 회원가입하기 위해 입력할 id및 password 객체를 생성한다 |
| updateProfile(UserProfile profile) | 유저가 프로필을 생성/수정 할때 프로필 객체를 생성한다 |
| getUserInfo(String id) | 유저 프로필이 정상적으로 생성되면 프로필 id를 생성한다 |
- **설명**: 회원가입·로그인·프로필 수정 처리

**BookService**
| 메서드명 | 설명 |
|:---|:---|
| searchBooks(String keyword) | 책을 검색할때 키워드를 객체로 받는다 | 
| getBookDetails(Long bookId) | 검색한 책의 세부사항을 불러온다 |
| addBookToShelf(Long bookId) | 검색한 책의 서재로 추가하는 기능을 제공한다 |
| userId(String userId) | 유저의 로그인 상태 및 유저의 정보를 확인한다 | 
| removeBookFromShelf() | 유저의 서재에서 해당 책을 제거하는 기능을 제공한다 |
- **설명**: 도서 검색 및 상세 보기

**ReadingService**
| 메서드명 | 설명 |
|:---|:---|
| createReadingRecord() | 독서기록을 생성한다 |
| updateReadingProgress() | 독서 진행사항을 업데이트 한다 |
| getReadingStatistics() | 독서 상태를 생성한다 (읽기전, 읽은후, 찜목록 등) | 
| calculateReadingGoals() | 날짜별 독서목록을 기록한다 |
- **설명**: 독서 기록 작성/수정, 통계 계산

**ChallengeService**
| 메서드명 | 설명 |
|:---|:---|
| createChallenge() | 독서 챌린지를 생성한다 |
| joinChallenge() | 독서 챌린지에 참여한다 |
| updateProgress() | 독서 챌린지 진행사항을 업데이트한다 |
- **설명**: 챌린지 생성 및 참여 관리

**CommunityService**
| 메서드명 | 설명 |
|:---|:---|
| createPost() | 게시글을 생성한다 |
| editPost() | 게시글을 수정한다 | 
| getPosts() | 게시글을 등록한다 |
| addComment() | 게시글에 대한 댓글을 추가한다 |
- **설명**: 게시글/댓글 작성 및 관리

**FriendService**
| 메서드명 | 설명 |
|:---|:---|
| addFriend() | 친구를 추가한다 |
| acceptRequest() | 친구 요청을 수락한다 |
| removeFriend() | 친구를 삭제한다 |
| getFriendList() | 친구 목록을 불러온다 |
- **설명**: 친구 관계 추가/삭제 관리

**GoalService**
| 메서드명 | 설명 |
|:---|:---|
| setGoal() | 독서 목표를 설정한다 |
| updateGoalProgress() | 독서 목표 진행사항을 업데이트한다 |
| getGoalStatus() | 독서 목표 달성률을 입력한다 |
- **설명**: 독서 목표 설정 및 달성률 계산

**NotificationService**
| 메서드명 | 설명 |
|:---|:---|
| sendNotification() | 유저에게 알람을 발송한다 |
| getNotifications() | 사용자가 알람을 수신한다 | 
| markAsRead() | 사용자는 해당 알람을 읽으면 읽음표시를 한다 |
- **설명**: 알림 생성 및 읽음 처리
---

## 4. Sequence Diagram

이 장에서는 주요 기능들의 동적 상호작용을 시퀀스 다이어그램으로 표현한다.

### 4.1. 회원가입 시퀀스 다이어그램
![회원가입 시퀀스 다이어그램](untitled/SequenceDiagram/Register.png)

사용자가 회원가입을 진행하는 과정을 나타내는 시퀀스 다이어그램이다.
사용자가 웹 페이지에서 회원가입 버튼을 클릭하면, 시스템은 회원가입을 위한 폼을 요청하고 화면에 표시한다. 사용자는 이름, 비밀번호, 닉네임, 이메일 등의 필수 정보를 입력하고, 웹 페이지는 입력된 정보를 백엔드 시스템으로 전달한다. 백엔드 시스템은 전달받은 정보를 바탕으로 사용자 정보의 유효성을 검증하고, 검증이 완료되면 데이터베이스에 새로운 사용자 정보를 저장한다. 이후 데이터베이스가 반환한 저장 결과를 확인하여 회원가입이 정상적으로 처리되었는지를 검증한 뒤, 시스템은 회원가입 완료 응답을 웹 페이지로 전송한다. 마지막으로 웹 페이지는 사용자에게 회원가입이 완료되었음을 알리고, 로그인을 진행할 수 있도록 안내 메시지를 표시하면서 회원가입 과정이 종료된다.

### 4.2. 로그인/로그아웃 시퀀스 다이어그램
![로그인/로그아웃 시퀀스 다이어그램](untitled/SequenceDiagram/Login.png)

사용자가 로그인과 로그아웃 기능을 이용하는 과정을 나타내는 시퀀스 다이어그램이다.
사용자가 웹 페이지에서 로그인 버튼을 클릭하고 이메일과 비밀번호를 입력하면, 웹 페이지는 해당 정보를 백엔드 시스템으로 전달한다. 시스템은 데이터베이스를 조회하여 입력된 정보가 유효한지 검증하고, 검증이 완료되면 로그인 성공 응답과 함께 사용자 세션 또는 인증 토큰을 생성하여 웹 페이지로 전송한다.
웹 페이지는 사용자에게 로그인 성공 메시지를 표시하고, 사용자 전용 화면으로 이동시킴으로써 로그인 과정이 완료된다. 로그아웃 과정에서는, 로그인 상태의 사용자가 로그아웃 버튼을 클릭하면 웹 페이지가 로그아웃 요청을 백엔드 시스템으로 전달한다. 시스템은 해당 사용자의 세션이나 인증 토큰을 무효화하여 접근 권한을 해제하고, 로그아웃 완료 응답을 웹 페이지로 전송한다. 웹 페이지는 사용자에게 로그아웃이 완료되었음을 알리고, 초기 화면 또는 로그인 페이지로 이동시키면서 로그아웃 과정이 종료된다.

### 4.3. 독서 기록 작성 시퀀스 다이어그램
![독서 기록 작성 시퀀스 다이어그램](untitled/SequenceDiagram/CreateReadingRecord.png)

사용자가 독서 기록을 작성하는 과정을 나타내는 시퀀스 다이어그램이다. 사용자가 웹 페이지에서 독서 기록 작성 버튼을 클릭하면, 웹 페이지는 기록 입력 폼을 사용자에게 표시한다. 사용자는 읽은 책의 제목, 별점, 좋아하는 구절 등의 내용을 입력하고 저장을 요청한다. 웹 페이지는 입력된 데이터를 백엔드 시스템으로 전달하고, 시스템은 해당 정보를 데이터베이스에 저장한다. 데이터베이스가 저장 결과를 반환하면 시스템은 이를 확인하여 독서 기록이 정상적으로 등록되었는지 검증한다. 이후 시스템은 저장 성공 메시지를 웹 페이지로 전송하고, 웹 페이지는 사용자에게 “독서 기록이 성공적으로 작성되었습니다.”라는 안내 메시지를 표시하면서 독서 기록 작성 과정이 완료된다.


### 4.4. 도서 상세 조회 다이어그램
![도서 상세 조회 시퀀스 다이어그램](untitled/SequenceDiagram/ViewBookDetails.png)

사용자가 도서 상세 조회하는 과정을 나타낸 sequence diagram이다. 사용자가 도서를 클릭하면 도서 상세 페이지가 표시된다. 로그인 상태일 경우, 사용자의 도서 상태를 조회하여 사용자에게 상태 표시 데이터를 전달한다. 데이터베이스에서 관련 정보를 조회한 뒤 사용자에게 해당 상태 데이터를 전달한다. 웹 페이지는 전달받은 정보를 바탕으로 사용자의 상태를 시각적으로 표시하며, 도서에 대한 제목, 저자, 카테고리, 별점, 독자 리뷰 등의 세부 정보를 함께 보여준다. 또한 사용자는 이 화면에서 찜하기, 독서 기록 작성, 구매 사이트 이동 등 도서 관련 기능을 직접 수행할 수 있다. 시스템은 사용자의 추가 요청이 발생할 경우, 해당 동작을 처리하고 결과를 즉시 반영함으로써 도서 상세 조회 과정을 완성한다.

### 4.5. 챌린지 생성 시퀀스 다이어그램
![챌린지 생성 시퀀스 다이어그램](untitled/SequenceDiagram/CreateChallenge.png)

사용자가 챌린지 생성을 하는 과정을 나타내는 sequence diagram이다. 사용자가 챌린지 생성 버튼으로 새로운 챌린지에 대한 내용을 작성한 후 챌린지 만들기를 하면, 시스템은 먼저 전달받은 정보를 바탕으로 새로운 챌린지를 등록하기 위한 내부 처리를 수행한 뒤, 데이터베이스에 챌린지 정보를 저장한다. 시스템은 데이터베이스가 반환하는 정보를 확인하여 챌린지가 정상적으로 등록되었는지 검증한다. 이후 시스템은 챌린지가 성공적으로 생성되었다는 사실을 사용자에게 알려주기 위해 알림 데이터를 저장하고, 사용자에게 챌린지 성공 메시지를 화면에 표시하도록 하여 챌린지 생성 과정이 종료된다.

### 4.6. 챌린지 참여 시퀀스 다이어그램
![챌린지 참여 시퀀스 다이어그램](untitled/SequenceDiagram/JoinChallenge.png)

사용자가 독서 챌린지에 참여하는 과정을 나타내는 sequence diagram이다. 사용자는 화면에 표시된 챌린지 목록 중에서 참여 희망 챌린지를 선택하면, 시스템은 챌린지 상세 내용을 조회하고, 데이터베이스에서 세부 정보를 불러와 사용자게에 보여준다. 이후 사용자가 참여하기 버튼을 클릭하면, 시스템은사용자를 새로운 챌린지 참여자로 등록하고, 이때 데이터베이스에 사용자 id와 챌린지 id를 함께 저장하여 참여 이력이 기록되며, 등록이 완료되면 사용자에게 성공 메시지를 표시한다.

### 4.7. 게시글 작성 시퀀스 다이어그램
![게시글 작성 시퀀스 다이어그램](untitled/SequenceDiagram/CommunityCreatePost.png)

사용자가 커뮤니티 게시글을 작성하는 과정을 나타내는 sequence diagram이다. 사용자가 커뮤니티 페이지에서 글쓰기 버튼을 클릭하면, 시스템은 게시글 종류(퀴즈, 투표, 토론)와 내용을 입력할 수 있는 폼을 나타내낸다. 이후 사용자가 입력 완료 버튼을 누르면, 시스템은 게시글 정보를 데이터베이스에 저장하고, 저장에 성공하였다는 메시지를 사용자에게 표시한다.

### 4.8. 프로필 설정 시퀀스 다이어그램
![프로필 설정 시퀀스 다이어그램](untitled/SequenceDiagram/UserProfileSetting.png)


### 4.9. 친구 추가/삭제 시퀀스 다이어그램

<img width="1015" height="739" alt="스크린샷 2025-11-04 221943" src="https://github.com/user-attachments/assets/fa803937-104f-4b57-b54e-e47ccba75508" />

이 다이어그램은 하나의 기능(친구 관리)이 두 가지 시나리오(추가/삭제)로 나뉘는 과정을 보여준다.  

⦁ **핵심 로직**: alt (Alternative, 대안) 블록을 사용한다.  

⦁ **친구 추가 (Add Friend)**:
 1. 사용자가 친구 추가를 요청하면, 클라이언트는 서버에 POST (생성) 요청을 보낸다.
 2. 서버(UserService)는 새로운 '친구 관계(Friendship)'를 만드는데, 이때 상태를 '대기중(pending)'으로  설정한다.
 3. 동시에 NotificationService를 호출하여, 요청을 받은 상대방에게 "친구 요청 알림"을 보낸다.
 
⦁ **친구 삭제 (Remove Friend)**:
 1. 사용자가 '친구 삭제'를 요청하면, 클라이언트는 DELETE (삭제) 요청을 보낸다.
 2. 서버는 데이터베이스에서 '수락됨(accepted)' 상태인 친구 관계 레코드를 찾아 완전히 삭제한다.

### 4.10. 도서 찜하기(토글 방식) 시퀀스 다이어그램

<img width="848" height="603" alt="스크린샷 2025-11-04 201532" src="https://github.com/user-attachments/assets/f2dd2434-6777-4cb4-91ae-834b3e525ac6" />

이 다이어그램은 하나의 버튼으로 두 가지 상태(추가/해제)를 번갈아 처리하는 토글 로직을 보여준다.  

⦁ **핵심 로직**: 서버가 현재 상태를 먼저 확인하고 그에 따라 반대 행동을 한다.
 1. 사용자가 '찜' 아이콘을 누르면, 클라이언트는 서버에 POST 요청을 보낸다.
 2. 서버(WishlistService)는 데이터베이스에서 이 사용자가 이 책을 이미 찜했는지 먼저 확인(Select)한다.
 3. alt (대안) 블록이 여기서 나뉜다.  
 \- 만약 이미 찜한 상태(true)라면: 찜 목록에서 해당 데이터를 삭제(Delete)하고 "removed"라고 응답한다.  
 \- 만약 찜하지 않은 상태(false)라면: 찜 목록에 새 데이터를 생성(Create)하고 "added"라고 응답한다.  
 4. 클라이언트는 서버의 응답("added" 또는 "removed")에 따라 하트 아이콘을 채우거나 비운다.

### 4.11. 목표 설정 시퀀스 다이어그램

<img width="1039" height="585" alt="스크린샷 2025-11-04 201641" src="https://github.com/user-attachments/assets/03843be7-7bc5-4b82-a9d7-23a7cade9001" />

이 다이어그램은 데이터가 없으면 새로 만들고, 있으면 수정하는 'Upsert' 로직을 보여준다.

⦁ **핵심 로직**: 서버가 기존 데이터 유무를 확인하여 생성(Create)할지 수정(Update)할지 결정한다.  
 1. 사용자가 "월 5권 읽기" 같은 목표를 설정하고 저장한다.  
 2. 서버(GoalService)는 데이터베이스에서 이 사용자의 이달(goalType) 목표가 이미 존재하는지 먼저 확인(Select)한다.  
 3. alt (대안) 블록이 나뉜다.  
 \- 만약 기존 목표가 없다면(false): 새로운 독서 목표(ReadingGoal) 데이터를 생성(Create)한다.  
 \- 만약 기존 목표가 있다면(true): 기존 데이터를 수정(Update)한다. (예: 5권을 7권으로 변경)  
 4. 서버는 "저장 완료" 응답을 보내고, 클라이언트는 UI에 "저장됨"을 표시한다.

### 4.12. 알림/공지 수신 시퀀스 다이어그램

<img width="1231" height="349" alt="스크린샷 2025-11-04 202227" src="https://github.com/user-attachments/assets/8c3559ac-b188-484c-8d50-719c46c1db02" />

이 다이어그램은 사용자가 아닌 시스템(이벤트)이 시작점이 되는 'Push' 방식을 보여준다.  

⦁ **핵심 로직**: 알림은 DB에 기록되고, 실시간으로 전송되는 두 가지 경로로 처리된다.  
 1. 시작: 친구 서비스 같은 외부에서 알림 보낼 일이 생긴다. (예: UserB가 친구 요청을 보냄)  
 2. 기록 (Persistence): NotificationService는 이 알림을 먼저 데이터베이스에 저장(Create)한다. (사용자가 오프라인일 때 나중에 볼 수 있도록)  
 3. 실시간 전송 (Push): 동시에 WebSocketServer(실시간 통신 서버)를 통해 현재 접속 중인 사용자에게 "새 알림이 왔다"고 즉시 푸시한다.  
 4. 수신: 사용자의 클라이언트(웹)는 푸시를 받아 UI에 '빨간 점' 같은 알림을 띄운다.

---

## 5. State Machine Diagram

### 5.1. 사용자 상태 다이어그램

![User](https://github.com/The-gallery-00/starbooks/blob/main/state%20machine%20diagram/User.png)

**상태**:
- **미가입**
- **가입**
- **로그인**
- **로그아웃**
- **정지**

**전이**:
- 미가입 → 가입: 회원가입 완료
- 가입 → 로그인: 로그인 성공
- 로그인 → 로그아웃: 로그아웃 또는 세션 만료
- 로그인 → 정지: 관리자 계정 정지
- 정지 → 가입: 정지 해제

### 5.2. 독서 기록 상태 다이어그램

![Record](https://github.com/The-gallery-00/starbooks/blob/main/state%20machine%20diagram/ReadingRecord.png)

**상태**:
- **계획**
- **진행중**
- **완료**
- **중단**

**전이**:
- 계획 → 진행중: 독서 시작
- 진행중 → 완료: 독서 완료
- 진행중 → 중단: 독서 중단
- 중단 → 진행중: 독서 재개

### 5.3. 독서 챌린지 상태 다이어그램

![ChallengeParticipation](https://github.com/The-gallery-00/starbooks/blob/main/state%20machine%20diagram/ChallengeParticipation.png)

**상태**:
- **대기**
- **참여중**
- **달성**
- **종료**

**전이**:
- 대기 → 참여중: 참가 등록
- 참여중 → 달성: 목표 달성 완료
- 참여중 → 종료: 기간 만료 또는 강제 종료
- 달성 → 종료: 챌린지 전체 종료

### 5.4. 커뮤니티 게시글 상태 다이어그램

![comunitypost](https://github.com/The-gallery-00/starbooks/blob/main/state%20machine%20diagram/Comunity%20Post.png)

**상태**:
- **작성중** 
- **게시됨** 
- **수정됨** 
- **삭제됨** 

**전이**:
- 작성중 → 게시됨: 작성 완료 후 게시 
- 게시됨 → 수정됨: 게시글 수정 
- 수정됨 → 게시됨: 수정후 다시 게시 
- 게시됨 → 삭제됨: 게시글 삭제 요청

### 5.5. 알림 상태 다이어그램

![notification](https://github.com/The-gallery-00/starbooks/blob/main/state%20machine%20diagram/notification.png)

**상태**:
- **생성됨** 
- **미열람** 
- **열람됨** 
- **삭제됨** 

**전이**:
- 생성됨 → 미열람: 알림 발송 
- 미열람 → 열람됨: 사용자가 클릭하여 확인 
- 열람됨 → 삭제됨: 사용자가 알림 삭제

### 5.6. 독서 목표 상태 다이어그램

![goal](https://github.com/The-gallery-00/starbooks/blob/main/state%20machine%20diagram/Goal.png)

**상태**:
- **설정됨**
- **진행중**
- **달성**
- **만료**

**전이**:
- 설정됨 → 진행중: 목표 시작
- 진행중 → 달성: 목표 도달 
- 진행중 → 만료: 기간 초과 
- 달성 → 설정됨: 새 목표 설정


---

## 6. User Interface Prototype
이 장은 예상 UI와 UI 안의 각 구성요소를 설명한다. 실제 개발에 따라서 UI 디자인 및 일부 구성은 달라질 수 있지만 내용 및 기능은 동일하다.
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

## 7. Implementation Requirements

H/W platform requirements 

- CPU: Intel i3 이상
- RAM: 8GB RAM 이상
- HDD / SSD: 500GB SSD 이상
- Network: WAN 연결 가능 (TCP/IP 지원)

Server Platform Requirements

Application Server:
- AWS EC2 t2.micro 이상
- OS: Ubuntu 20.04 LTS
- CPU: 1 vCPU
- RAM: 1GB 이상
- Storage: 30GB 이상

Database Server:
- AWS RDS MySQL db.t2.micro 이상
- CPU: 1 vCPU
- RAM: 1GB 이상
- Storage: 20GB 이상

S/W platform requirements

Backend :
- OS: Windows 10 이상
- Implement Language: Java 11+
- Framework: Spring Boot 2.6+
- Database: MySQL 8+

Front-end: 
- OS: Windows 10 이상
- Implement Language: JavaScript(ES6+), HTML5, CSS3
- Framework / Libraries: React 18+
- Development Environment / IDE: Visual Studio Code 1.80+
- Package Manager / Build Tool: Node.js 18+, npm 9+
- Browser Compatibility: Chrome 90+, Firefox 88+, Safari 14+

---

## 8. Glossary

| 용어 | 설명 |
|:---|:---|
| 독서 기록 | 사용자가 읽은 책에 대한 별점, 도서평, 구절 등의 기록 |
| 독서 챌린지 | 정해진 기간 내에 목표량의 독서를 달성하는 활동 |
| 내 서재 | 사용자의 개인 도서 관리 공간 |
| 찜하기 | 관심 있는 도서를 개인 목록에 저장하는 기능 |

---

## 9. References

1. Software Engineering: A Practitioner's Approach, Roger S. Pressman
2. UML Distilled: A Brief Guide to the Standard Object Modeling Language, Martin Fowler
3. Spring Boot Reference Documentation
4. React Documentation
5. MySQL Documentation
6. RESTful Web Services, Leonard Richardson
