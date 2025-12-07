import React, { useState, useEffect, useContext } from "react";
import AddChallenge from "./AddChallenge";
import "./Challenge.css";
import api from "./api/axiosInstance";
import { UserContext } from "./UserContext";

// D-Day 계산
const calculateDDay = (endDate) => {
  if (!endDate) return "";
  const today = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff === 0 ? "D-day" : diff > 0 ? `D-${diff}` : "종료";
};

// 진행률 계산
const calculateProgress = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  if (today <= start) return 0;
  if (today >= end) return 100;
  const total = end - start;
  const done = today - start;
  return Math.floor((done / total) * 100);
};

// 챌린지 카드
const ChallengeCard = ({ challenge, openDetail, toggleJoin }) => {
  const dDay = calculateDDay(challenge.endDate);
  const progress = calculateProgress(challenge.startDate, challenge.endDate);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    toggleJoin(challenge.id, challenge.joined);
  };

  return (
    <div className="challenge-card" onClick={() => openDetail(challenge)}>
      <div className="card-header">
        <span className={`d-day ${dDay === "종료" ? "ended" : ""}`}>{dDay}</span>
        <button
          className={`card-action-btn ${challenge.joined ? "joined" : ""}`}
          onClick={handleButtonClick}
        >
          {challenge.joined ? "참여 취소" : "참여하기"}
        </button>
      </div>
      <div className="card-content">
        <h3 className="challenge-title c-ellipsis-title">{challenge.title}</h3>
        <p className="challenge-description c-ellipsis-desc">
          {challenge.description && challenge.description.trim() !== "" 
            ? challenge.description 
            : "설명이 없습니다."}
        </p>

        <div className="dday-progress-container">
          <div className="dday-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="c-participants-count">참여자: {challenge.participants}명</p>
      </div>
    </div>
  );
};

export default function Challenge() {
  const { user } = useContext(UserContext);
  const [challenges, setChallenges] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);

  // 페이지네이션
  const pageGroupSize = 3;
  const joinedPerPage = 4;
  const allPerPage = 10;
  const [joinedPage, setJoinedPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [joinedGroup, setJoinedGroup] = useState(1);
  const [allGroup, setAllGroup] = useState(1);

  // 챌린지 목록 로딩
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get("/api/challenges");
        let data = response.data.data || response.data || [];

        // 내 참여 정보 가져오기
        let myChallengeIds = new Set();
        if (user && (user.userId || user.id || user.memberId)) {
          const uid = user.userId || user.id || user.memberId;
          try {
            const myRes = await api.get(`/api/challenges/my`, {
              params: { userId: uid }
            });
            const myData = myRes.data || [];
            myChallengeIds = new Set(myData.map(c => c.challengeId));
          } catch (err) {
            console.warn("내 참여 목록 로딩 실패:", err);
          }
        }

        const mapped = data.map((item) => ({
          id: item.challengeId,
          title: item.title,
          description: item.description,
          maxBooks: item.targetBooks,
          startDate: item.startDate,
          endDate: item.endDate,
          participants: item.participantCount || 0,
          joined: myChallengeIds.has(item.challengeId),
          status: item.status,
          createdAt: item.createdAt,
        }));

        setChallenges(mapped);
      } catch (err) {
        console.error("챌린지 목록 로딩 실패:", err);
      }
    };

    fetchChallenges();
  }, [user]);

  // 유효한 챌린지 필터링
  const today = new Date();
  const validChallenges = challenges.filter(c => {
    if (!c.endDate || c.status === "CANCELLED") return false;
    const end = new Date(c.endDate);
    end.setHours(23, 59, 59);
    return end >= today;
  });

  const joinedChallenges = validChallenges
    .filter(c => c.joined)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const allChallenges = validChallenges
    .filter(c => !c.joined)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

  // 참여/취소 처리
  const toggleJoin = async (id, currentlyJoined) => {
    if (!user) return alert("로그인이 필요합니다.");
    const userId = user.userId || user.id || user.memberId;
    if (!userId) return alert("유저 정보 오류. 재로그인 해주세요.");

    console.log("==== [ 챌린지 참여/취소 요청 시작 ] ====");
    console.log("▶ 챌린지 ID:", id);
    console.log("▶ 현재 joined 상태:", currentlyJoined);
    console.log("▶ 사용자 ID:", userId);

    try {
      if (!currentlyJoined) {
        await api.post(`/api/challenges/${id}/join`, { userId });
        alert("챌린지에 참여했습니다!");
      } else {
        await api.delete(`/api/challenges/${id}/join`, { params: { userId } });
        alert("참여를 취소했습니다!");
      }

      setChallenges(prev =>
        prev.map(c => 
          c.id === id 
            ? { 
                ...c, 
                joined: !c.joined, 
                participants: currentlyJoined ? c.participants - 1 : c.participants + 1 
              } 
            : c
        )
      );

      if (selected?.id === id) {
        setSelected(prev => ({
          ...prev,
          joined: !prev.joined,
          participants: currentlyJoined ? prev.participants - 1 : prev.participants + 1
        }));
      }
    } catch (err) {
      console.error("참여 처리 실패:", err);
      alert("참여/취소 처리 중 오류가 발생했습니다.");
    }
  };

  const addChallenge = (newChallenge) => {
    const newId = challenges.length ? Math.max(...challenges.map(c => c.id)) + 1 : 1;
    setChallenges(prev => [
      { ...newChallenge, id: newId, joined: false, participants: 0 },
      ...prev
    ]);
    setShowAdd(false);
  };

  return (
    <div className="challenge-list-container">
      <button className="create-challenge-btn" onClick={() => setShowAdd(true)}>
        새 챌린지 생성
      </button>

      {/* 참여중 챌린지 */}
      <div className="joined-challenges-container">
        <h3>참여중인 챌린지</h3>
        {joinedChallenges.length === 0 ? (
          <p>아직 참여중인 챌린지가 없습니다. 참여해보세요!</p>
        ) : (
          <>
            <div className="challenge-grid">
              {joinedList.map(ch => (
                <ChallengeCard key={ch.id} challenge={ch} openDetail={setSelected} toggleJoin={toggleJoin} />
              ))}
            </div>
            <div className="c-pagination">
              <button
                className="c-page-arrow"
                onClick={() => { if (joinedGroup > 1) { setJoinedGroup(joinedGroup-1); setJoinedPage((joinedGroup-2)*pageGroupSize+1); } }}
                disabled={joinedGroup === 1}
              >&lt;</button>
              {getPageNumbers(joinedGroup, totalJoinedPages).map(num => (
                <button
                  key={num}
                  className={`c-page-btn ${joinedPage===num?"active":""}`}
                  onClick={()=>setJoinedPage(num)}
                >{num}</button>
              ))}
              <button
                className="c-page-arrow"
                onClick={() => { if (joinedGroup < totalJoinedGroups) { setJoinedGroup(joinedGroup+1); setJoinedPage(joinedGroup*pageGroupSize+1); } }}
                disabled={joinedGroup===totalJoinedGroups}
              >&gt;</button>
            </div>
          </>
        )}
      </div>

      {/* 전체 챌린지 */}
      <h3>전체 챌린지</h3>
      <div className="challenge-grid">
        {allList.map(ch => (
          <ChallengeCard key={ch.id} challenge={ch} openDetail={setSelected} toggleJoin={toggleJoin} />
        ))}
      </div>
      <div className="c-pagination">
        <button
          className="c-page-arrow"
          onClick={() => { if (allGroup>1){ setAllGroup(allGroup-1); setAllPage((allGroup-2)*pageGroupSize+1); } }}
          disabled={allGroup===1}
        >&lt;</button>
        {getPageNumbers(allGroup, totalAllPages).map(num => (
          <button
            key={num}
            className={`c-page-btn ${allPage===num?"active":""}`}
            onClick={()=>setAllPage(num)}
          >{num}</button>
        ))}
        <button
          className="c-page-arrow"
          onClick={() => { if (allGroup<totalAllGroups){ setAllGroup(allGroup+1); setAllPage(allGroup*pageGroupSize+1); } }}
          disabled={allGroup===totalAllGroups}
        >&gt;</button>
      </div>

      {showAdd && <AddChallenge onClose={()=>setShowAdd(false)} onCreate={addChallenge}/>}

      {/* 모달 */}
      {selected && (
        <div className="c-modal-overlay">
          <div className="challenge-modal">
            <div className="c-modal-content">
              <h2>{selected.title}</h2>
              <p>{selected.description && selected.description.trim() !== "" ? selected.description : "설명이 없습니다."}</p>
              <p>📆시작일: {selected.startDate} / 📅마감일: {selected.endDate}</p>
              <p>✔︎ 목표: {selected.maxBooks}권</p>
            </div>
            <div className="c-modal-actions">
              <button className="c-modal-join-btn" onClick={()=>toggleJoin(selected.id, selected.joined)}>
                {selected.joined ? "참여 취소" : "참여하기"}
              </button>
              <button className="c-modal-close-btn" onClick={()=>setSelected(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
