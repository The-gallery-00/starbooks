// src/Home.js
import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>환영합니다!</h1>
      <p>이곳은 Starbooks 홈 화면입니다.</p>

      <section className="home-feature">
        <h2>추천 도서</h2>
        <ul>
          <li>데미안 - 헤르만 헤세</li>
          <li>1984 - 조지 오웰</li>
          <li>모비딕 - 허먼 멜빌</li>
        </ul>
      </section>

      <section className="home-feature">
        <h2>커뮤니티 최신 글</h2>
        <ul>
          <li>독서 토론: AI 기술로 고인을 복원해도 될까?</li>
          <li>퀴즈: 빅 브라더는 무엇을 상징할까?</li>
          <li>투표: 당신의 오늘의 책은 무엇인가요?</li>
        </ul>
      </section>
    </div>
  );
}
