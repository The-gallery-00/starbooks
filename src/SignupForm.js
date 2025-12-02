// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function SignupForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: ''
  });

  // 검사 통과 여부 상태들 (초록색 메시지용)
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // ★ 추가: 에러 상태들 (빨간색 메시지용) ★
  const [isIdError, setIsIdError] = useState(false);
  const [isNicknameError, setIsNicknameError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // 수정하면 다시 확인받도록 초기화 (성공/에러 메시지 모두 안 보이게)
    if (name === 'userId') {
      setIsIdChecked(false);
      setIsIdError(false); // 에러 메시지도 숨김
    }
    if (name === 'nickname') {
      setIsNicknameChecked(false);
      setIsNicknameError(false); // 에러 메시지도 숨김
    }
  };

  // 1. 아이디 중복 확인
  const handleCheckId = () => {
    const { userId } = formData;
    if (!userId) { alert('아이디를 입력해주세요.'); return; }

    const existIds = ['admin', 'test', 'star']; // 가짜 데이터

    if (existIds.includes(userId)) {
      // 중복된 경우
      setIsIdChecked(false); // 통과 X
      setIsIdError(true);    // 에러 O (빨간 메시지 띄우기)
    } else {
      // 사용 가능한 경우
      setIsIdChecked(true);  // 통과 O (초록 메시지 띄우기)
      setIsIdError(false);   // 에러 X
    }
  };

  // 2. 닉네임 중복 확인
  const handleCheckNickname = () => {
    const { nickname } = formData;
    if (!nickname) { alert('닉네임을 입력해주세요.'); return; }

    const existNicknames = ['운영자', '관리자', '김스타']; 

    if (existNicknames.includes(nickname)) {
      // 중복된 경우: alert 제거하고 에러 상태 true
      setIsNicknameChecked(false);
      setIsNicknameError(true); 
    } else {
      // 사용 가능한 경우
      setIsNicknameChecked(true);
      setIsNicknameError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 유효성 검사들
    if (!isIdChecked) {
      alert('아이디 중복 확인을 해주세요!');
      return;
    }
    
    if (!isNicknameChecked) {
      alert('닉네임 중복 확인을 해주세요!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 서로 일치하지 않습니다! 다시 확인해주세요.');
      return;
    }

    console.log('회원가입 정보:', formData);
    alert('회원가입이 완료되었습니다!');
    navigate('/home');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>
        <p>StarBooks의 일원이 되어주세요!</p>

        <form onSubmit={handleSubmit} className="signup-form">
          
          {/* 아이디 */}
          <div className="input-group">
            <label>아이디</label>
            <div className="id-check-wrapper">
              <input 
                type="text" 
                name="userId" 
                placeholder="아이디를 입력하세요"
                value={formData.userId}
                onChange={handleChange}
                required
              />
              <button type="button" className="btn-check" onClick={handleCheckId}>
                중복확인
              </button>
            </div>
            {/* 조건부 렌더링: 성공이면 초록색, 에러면 빨간색 */}
            {isIdChecked && <p className="msg-success">✅ 사용 가능한 아이디입니다.</p>}
            {isIdError && <p className="msg-error">❌ 사용 불가능한 아이디입니다.</p>}
          </div>

          {/* 비밀번호 */}
          <div className="input-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              name="password" 
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="input-group">
            <label>비밀번호 확인</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="비밀번호를 한 번 더 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.confirmPassword && (
              <p className={formData.password === formData.confirmPassword ? 'msg-success' : 'msg-error'}>
                {formData.password === formData.confirmPassword 
                  ? '✅ 비밀번호가 일치합니다.' 
                  : '❌ 비밀번호가 일치하지 않습니다.'}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div className="input-group">
            <label>닉네임</label>
            <div className="id-check-wrapper">
              <input 
                type="text" 
                name="nickname" 
                placeholder="활동명(별명)"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
              <button type="button" className="btn-check" onClick={handleCheckNickname}>
                중복확인
              </button>
            </div>
            {/* 조건부 렌더링: 성공이면 초록색, 에러면 빨간색 */}
            {isNicknameChecked && <p className="msg-success">✅ 사용 가능한 닉네임입니다.</p>}
            {isNicknameError && <p className="msg-error">❌ 사용 불가능한 닉네임입니다.</p>}
          </div>

          {/* 이메일 */}
          <div className="input-group">
            <label>이메일</label>
            <input 
              type="email" 
              name="email" 
              placeholder="example@starbooks.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-signup">가입하기</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;