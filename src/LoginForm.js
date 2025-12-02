// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginForm({ toggleToSignup }) {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginId && loginPw) {
      localStorage.setItem('user', JSON.stringify({ id: loginId, nickname: '김스타' }));
      navigate('/home');
    } else {
      alert('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const handleFindInfo = (type) => {
    if (type === 'id') {
      alert('아이디 찾기 기능을 준비 중입니다.');
    } else {
      alert('비밀번호 찾기 기능을 준비 중입니다.');
    }
  };

  return (
    <>
      <h2>Welcome</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="아이디" 
            className="book-input"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="비밀번호" 
            className="book-input"
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-book-login">로그인</button>
      </form>

      <div className="find-links">
        <span onClick={() => handleFindInfo('id')}>아이디 찾기</span>
        <span className="divider">|</span>
        <span onClick={() => handleFindInfo('pw')}>비밀번호 찾기</span>
      </div>

      <div className="links">
        <span onClick={toggleToSignup} className="toggle-link">
          아직 회원이 아니신가요? <b>회원가입</b>
        </span>
      </div>
    </>
  );
}

export default LoginForm;
