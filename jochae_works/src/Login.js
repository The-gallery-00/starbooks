import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "./UserContext";

function Login({ onSwitchToSignup, onSwitchToFindId, onSwitchToFindPw }) {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!id || !pw) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        usernameOrEmail: id,
        password: pw
      });

      const { token, user } = response.data;

      if (!token) {
        alert("서버에서 토큰을 받지 못했습니다.");
        return;
      }

      login(user, token);


      // Home으로 이동
      navigate("/home"); 
    } catch (error) {
      console.log(error);
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-content">
      <h2>Welcome</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="이메일" 
            className="book-input" 
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="비밀번호" 
            className="book-input" 
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-book-login">로그인</button>
      </form>

      <div className="links">
        <span onClick={onSwitchToSignup} className="toggle-link">
          아직 회원이 아니신가요? <b>회원가입</b>
        </span>
        <span onClick={onSwitchToFindPw} className="toggle-link" style={{ display: 'block', marginTop: '8px' }}>
          비밀번호를 잊으셨나요? <b>찾기</b>
        </span>
      </div>
    </div>
  );
}

export default Login;
