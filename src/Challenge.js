import React, { useState } from "react";
import AddChallenge from "./AddChallenge";
import "./Challenge.css";

const DUMMY_CHALLENGES = [
  {
    id: 1,
    title: "10월 독서 마라톤",
    description: "한 달 동안 5권의 책을 완독하는 챌린지",
    maxBooks: 5,
    startDate: "2025-11-01",
    endDate: "2025-12-05",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 2,
    title: "고전 문학 정복하기",
    description: "세계 문학의 고전 작품 10권을 읽어내는 장기 챌린지",
    maxBooks: 10,
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    joined: true,
    participants: 120, // 참여자 수 추가
  },
  {
    id: 3,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 4,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 5,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 6,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 7,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 158, // 참여자 수 추가
  },
  {
    id: 8,
    title: "과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여과학 분야 도서 3권 읽고 토론 참여고 토론 참여과학 분야 도서 3권 읽고 토론 참여도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 9,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 10,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 11,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 12,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 13,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2025-12-02",
    joined: false,
    participants: 12, // 참여자 수 추가
  },
  {
    id: 14,
    title: "과학 도서로 세상 이해하기",
    description: "과학 분야 도서 3권 읽고 토론 참여",
    maxBooks: 3,
    startDate: "2025-11-01",
    endDate: "2026-12-02",
    joined: false,
    participants: 8, // 참여자 수 추가
  },
];

// D-Day 계산
const calculateDDay = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff === 0 ? "D-day" : `D-${diff}`;
};

// 진행률 계산
const calculateProgress = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  if (today <= start) return 0;
  if (today >= end) return 100;
  const total = end - start;
  const done = today - start;
  return Math.floor((done / total) * 100);
};

const ChallengeCard = ({ challenge, openDetail, toggleJoin }) => {
  const dDay = calculateDDay(challenge.endDate);
  const progress = calculateProgress(challenge.startDate, challenge.endDate);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    toggleJoin(challenge.id);
  };

  return (
    <div className="challenge-card" onClick={() => openDetail(challenge)}>
      <div className="card-header">
        <span className="d-day">{dDay}</span>
        <button
          className={`card-action-btn ${challenge.joined ? "joined" : ""}`}
          onClick={handleButtonClick}
        >
          {challenge.joined ? "참여 취소" : "참여하기"}
        </button>
      </div>

      <div className="card-content">
        <h3 className="challenge-title c-ellipsis-title">{challenge.title}</h3>
        <p className="challenge-description c-ellipsis-desc">{challenge.description}</p>
        <div className="dday-progress-container">
          <div
            className="dday-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="c-participants-count">참여자: {challenge.participants}명</p>
      </div>
    </div>
  );
};

export default function Challenge() {
  const [challenges, setChallenges] = useState(DUMMY_CHALLENGES);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);

  const today = new Date();
  const validChallenges = challenges.filter((c) => {
    const end = new Date(c.endDate);
    end.setHours(23, 59, 59);
    return end >= today;
  });

  // 참여중 / 전체 챌린지 필터
  const joinedChallenges = validChallenges
    .filter(c => c.joined)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate)); // endDate 오름차순
  const allChallenges = validChallenges
    .filter(c => !c.joined)
    .sort((a, b) => {
      // 최신순: 생성일 최신순 (startDate 내림차순)
      // return new Date(b.startDate) - new Date(a.startDate);

      // 마감일 임박순: endDate 오름차순
      return new Date(a.endDate) - new Date(b.endDate);
    });

  // 페이지네이션 설정
  const pageGroupSize = 3;
  const joinedPerPage = 4;
  const allPerPage = 10;
  const [joinedPage, setJoinedPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [joinedGroup, setJoinedGroup] = useState(1);
  const [allGroup, setAllGroup] = useState(1);
  
  const totalJoinedPages = Math.ceil(joinedChallenges.length / joinedPerPage);
  const totalAllPages = Math.ceil(allChallenges.length / allPerPage);

  const totalJoinedGroups = Math.ceil(totalJoinedPages / pageGroupSize);
  const totalAllGroups = Math.ceil(totalAllPages / pageGroupSize);

  const joinedList = joinedChallenges.slice((joinedPage - 1) * joinedPerPage, joinedPage * joinedPerPage);
  const allList = allChallenges.slice((allPage - 1) * allPerPage, allPage * allPerPage);

  const getPageNumbers = (currentGroup, totalPages) => {
    const start = (currentGroup - 1) * pageGroupSize + 1;
    const end = Math.min(start + pageGroupSize - 1, totalPages);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const toggleJoin = (id) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: !c.joined } : c))
    );
    setSelected((prev) =>
      prev ? { ...prev, joined: !prev.joined } : null
    );
  };

  const addChallenge = (newChallenge) => {
    const newId = challenges.length ? challenges[0].id + 1 : 1;
    setChallenges((prev) => [
      {
        ...newChallenge,
        id: newId,
        joined: false,
        startDate: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setShowAdd(false);
  };

  return (
    <div className="challenge-list-container">
      <button className="create-challenge-btn" onClick={() => setShowAdd(true)}>
        새 챌린지 생성
      </button>

      {/* 참여중 영역 */}
      <div className="joined-challenges-container">
        <h3>참여중인 챌린지</h3>
        {joinedChallenges.length === 0 ? (
          <p>아직 참여중인 챌린지가 없습니다. 챌린지에 참여해보세요!</p>
        ) : (
          <>
            <div className="challenge-grid">
              {joinedList.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} openDetail={setSelected} toggleJoin={toggleJoin}/>
              ))}
            </div>
            <div className="c-pagination">
              <button
                className="c-page-arrow"
                onClick={() => {
                  const prevGroup = joinedGroup - 1;
                  if (prevGroup >= 1) {
                    setJoinedGroup(prevGroup);
                    setJoinedPage((prevGroup - 1) * pageGroupSize + 1);
                  }
                }}
                disabled={joinedGroup === 1}
              >
                &lt;
              </button>

              {getPageNumbers(joinedGroup, totalJoinedPages).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`c-page-btn ${joinedPage === pageNum ? "active" : ""}`}
                  onClick={() => setJoinedPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="c-page-arrow"
                onClick={() => {
                  const nextGroup = joinedGroup + 1;
                  if (nextGroup <= totalJoinedGroups) {
                    setJoinedGroup(nextGroup);
                    setJoinedPage((nextGroup - 1) * pageGroupSize + 1);
                  }
                }}
                disabled={joinedGroup === totalJoinedGroups}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
      

      {/* 전체 챌린지 영역 */}
      <h3>전체 챌린지</h3>
      <div className="challenge-grid">
        {allList.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} openDetail={setSelected} toggleJoin={toggleJoin}/>
        ))}
      </div>
      <div className="c-pagination">
        <button
          className="c-page-arrow"
          onClick={() => {
            const prevGroup = allGroup - 1;
            if (prevGroup >= 1) {
              setAllGroup(prevGroup);
              setAllPage((prevGroup - 1) * pageGroupSize + 1);
            }
          }}
          disabled={allGroup === 1}
        >
          &lt;
        </button>

        {getPageNumbers(allGroup, totalAllPages).map((pageNum) => (
          <button
            key={pageNum}
            className={`c-page-btn ${allPage === pageNum ? "active" : ""}`}
            onClick={() => setAllPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        <button
          className="c-page-arrow"
          onClick={() => {
            const nextGroup = allGroup + 1;
            if (nextGroup <= totalAllGroups) {
              setAllGroup(nextGroup);
              setAllPage((nextGroup - 1) * pageGroupSize + 1);
            }
          }}
          disabled={allGroup === totalAllGroups}
        >
          &gt;
        </button>
      </div>


      {showAdd && (
        <AddChallenge onClose={() => setShowAdd(false)} onCreate={addChallenge} />
      )}

      {selected && (
        <div className="c-modal-overlay">
          <div className="challenge-modal">
            <div className="c-modal-content">
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <p>📆시작일: {selected.startDate} / 📅마감일: {selected.endDate}</p>
              <p>✔︎ 목표: {selected.maxBooks}권</p>
            </div>

            <div className="c-modal-actions">
              <button className="c-modal-join-btn" onClick={() => toggleJoin(selected.id)}>
                {selected.joined ? "참여 취소" : "참여하기"}
              </button>

              <button className="c-modal-close-btn" onClick={() => setSelected(null)}>
                닫기
              </button>
            </div>

            
          </div>
        </div>
      )}
    </div>
  );
}
