import React from "react";
import "./Login.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <div className="underline" />

      <div className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="아이디를 입력해주세요"
        />
        <input
          className="login-input"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button className="login-btn">로그인</button>
      </div>

      <div className="login-links">
        <span>아이디 찾기</span>
        <span>|</span>
        <span>비밀번호 변경</span>
        <span>|</span>
        <span>회원가입</span>
      </div>
    </div>
  );
}
