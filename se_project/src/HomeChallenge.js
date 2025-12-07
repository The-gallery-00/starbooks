import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './HomeChallenge.css';
import api from "./api/axiosInstance";

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

export function HomeChallenge() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get("/api/challenges");
        let data = response.data.data || response.data || [];

        const mapped = data.map(item => ({
          id: item.challengeId,
          title: item.title,
          description: item.description || "설명이 없습니다.",
          participants: item.participantCount || 0,
          daysLeft: calculateDDay(item.endDate).replace("D-", ""),
          progress: calculateProgress(item.startDate, item.endDate)
        }));

        // 참여자 수 기준 내림차순 정렬
        mapped.sort((a, b) => b.participants - a.participants);

        setChallenges(mapped);
      } catch (err) {
        console.error("챌린지 목록 로딩 실패:", err);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <section className="hc-section">
      <div className="hc-header">
        <h2 className="hc-title">진행 중인 챌린지</h2>
        <Link to="/challengeRanking" className="hc-more-btn">더보기</Link>
      </div>

      <div className="hc-grid">
        {challenges.map(challenge => (
          <div key={challenge.id} className="hc-card">
            <div className="hc-card-top">
              <div className="hc-badge">{`D-${challenge.daysLeft}`}</div>
            </div>
            <div className="hc-card-content">
              <h3 className="hc-card-title">{challenge.title}</h3>
              <p className="hc-card-desc">{challenge.description}</p>
              <div className="hc-progress-wrapper">
                <div className="hc-progress-bar">
                  <div className="hc-progress-fill" style={{ width: `${challenge.progress}%` }} />
                </div>
                <span className="hc-progress-text">{challenge.progress}%</span>
              </div>
              <div className="hc-participants">
                {challenge.participants.toLocaleString()}명 참여 중
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
