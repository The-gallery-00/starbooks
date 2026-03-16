// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onSwitchToLogin }) {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    username: '',
    email: '', 
    password: '', 
    confirmPassword: '', 
    nickname: ''
  });

  const [status, setStatus] = useState({
    isEmailChecked: false, 
    isEmailError: false, 
    isNickChecked: false, 
    isNickError: false
  });

  const [emailValid, setEmailValid] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      setStatus(prev => ({ ...prev, isEmailChecked: false, isEmailError: false }));
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(value));
    }

    if (name === 'nickname') {
      setStatus(prev => ({ ...prev, isNickChecked: false, isNickError: false }));
    }
  };

  const handleCheckEmail = async () => {
    if (!formData.email) return alert('이메일을 입력해주세요.');
    if (!emailValid) return alert('올바른 이메일 형식이 아닙니다.');

    try {
      const response = await axios.get(`${BASE_URL}/api/users/check-email`, {
        params: { email: formData.email }
      });

      // 백에서 바로 true/false를 반환
      const isAvailable = response.data; 

      console.log('이메일 중복 확인 response:', response);

      setStatus(prev => ({
        ...prev,
        isEmailChecked: isAvailable,    // true면 사용 가능
        isEmailError: !isAvailable      // false면 이미 사용중
      }));
    } catch (error) {
      console.error('이메일 중복 확인 error:', error.response || error);
      alert('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };


  const handleCheckNickname = async () => {
    if (!formData.nickname) return alert('닉네임을 입력해주세요.');

    try {
      const response = await axios.get(`${BASE_URL}/api/users/check-nickname`, {
        params: { nickname: formData.nickname }
      });

      const isAvailable = response.data;

      console.log('닉네임 중복 확인 response:', response);

      setStatus(prev => ({
        ...prev,
        isNickChecked: isAvailable,
        isNickError: !isAvailable
      }));
    } catch (error) {
      console.error('닉네임 중복 확인 error:', error.response || error);
      alert('닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username) return alert('이름을 입력해주세요.');
    if (!formData.email) return alert('이메일을 입력해주세요.');
    if (!emailValid) return alert('이메일 형식이 올바르지 않습니다.');
    if (!status.isEmailChecked) return alert('이메일 중복 확인이 필요합니다.');
    if (!formData.password) return alert('비밀번호를 입력해주세요.');
    if (formData.password !== formData.confirmPassword) return alert('비밀번호가 일치하지 않습니다.');
    if (!formData.nickname) return alert('닉네임을 입력해주세요.');
    if (!status.isNickChecked) return alert('닉네임 중복 확인이 필요합니다.');

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname
      });

      console.log('회원가입 response:', response);

      alert(`환영합니다, ${formData.username}(${formData.nickname})님! 가입이 완료되었습니다.`);
      onSwitchToLogin();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-content">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="이름"
            className="book-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <div className="id-check-wrapper">
            <input
              type="text"
              name="email"
              placeholder="이메일"
              className="book-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="button" className="btn-check" onClick={handleCheckEmail}>중복확인</button>
          </div>
          {emailValid === true && <p className="msg-success">✅ 올바른 이메일 형식</p>}
          {emailValid === false && <p className="msg-error">❌ 이메일 형식이 올바르지 않습니다</p>}
          {status.isEmailChecked && <p className="msg-success">✅ 사용 가능한 이메일</p>}
          {status.isEmailError && <p className="msg-error">❌ 이미 사용중인 이메일</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="book-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            className="book-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {formData.confirmPassword && (
            <p className={formData.password === formData.confirmPassword ? 'msg-success' : 'msg-error'}>
              {formData.password === formData.confirmPassword ? '✅ 일치함' : '❌ 불일치'}
            </p>
          )}
        </div>

        <div className="input-group">
          <div className="id-check-wrapper">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              className="book-input"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            <button type="button" className="btn-check" onClick={handleCheckNickname}>중복확인</button>
          </div>
          {status.isNickChecked && <p className="msg-success">✅ 사용 가능</p>}
          {status.isNickError && <p className="msg-error">❌ 중복된 닉네임</p>}
        </div>

        <button type="submit" className="btn-book-login">가입하기</button>
      </form>

      <div className="links">
        <span onClick={onSwitchToLogin} className="toggle-link">로그인으로 돌아가기</span>
      </div>
    </div>
  );
}

export default Signup;
