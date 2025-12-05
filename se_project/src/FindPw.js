import React, { useState } from 'react';
import './Intro.css';

function FindPw({ onBackToLogin }) {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerifyUser = (e) => {
    e.preventDefault();
    if (!userId || !email) {
      alert('이름과 이메일을 모두 입력해주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleResetPassword = () => {
    if (!newPw || !confirmNewPw) {
      alert('새로운 비밀번호를 입력해주세요.');
      return;
    }
    alert('비밀번호가 성공적으로 변경되었습니다! 로그인해주세요.');
    setIsModalOpen(false);
    onBackToLogin(); 
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  return (
    <div className="login-content">
      <h2>비밀번호 찾기</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
        가입한 이름과 이메일을 입력하시면<br/>비밀번호를 재설정할 수 있습니다.
      </p>

      <form onSubmit={handleVerifyUser}>
        <div className="input-group">
          <input 
            type="text" placeholder="이름" className="book-input"
            value={userId} onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input 
            type="email" 
            placeholder="이메일" 
            className="book-input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />

          {email && !validateEmail(email) && (
            <p className="msg-error">❌ 유효한 이메일 형식이 아닙니다.</p>
          )}

          {email && validateEmail(email) && (
            <p className="msg-success">✅ 올바른 이메일 형식입니다.</p>
          )}
        </div>
        <button 
          type="submit" 
          className="btn-book-login" 
          disabled={!userId || !email || !validateEmail(email)}
          style={{
            opacity: (!userId || !email || !validateEmail(email)) ? 0.5 : 1,
            cursor: (!userId || !email || !validateEmail(email)) ? 'not-allowed' : 'pointer'
          }}
        >
          비밀번호 찾기
        </button>
      </form>

      <div className="links">
        <span onClick={onBackToLogin} className="toggle-link">
          로그인으로 돌아가기
        </span>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>비밀번호 재설정</h3>
            <p>새로운 비밀번호를 입력해주세요.</p>
            
            <div className="input-group">
              <input 
                type="password" placeholder="새 비밀번호" className="book-input"
                value={newPw} onChange={(e) => setNewPw(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <input 
                type="password" placeholder="새 비밀번호 확인" className="book-input"
                value={confirmNewPw} onChange={(e) => setConfirmNewPw(e.target.value)}
              />
              {confirmNewPw && (
                <p className={newPw === confirmNewPw ? 'msg-success' : 'msg-error'}>
                  {newPw === confirmNewPw 
                    ? '✅ 비밀번호가 일치합니다.' 
                    : '❌ 비밀번호가 일치하지 않습니다.'}
                </p>
              )}
            </div>

            <button className="btn-book-login" onClick={handleResetPassword}>
              변경 완료
            </button>
            
            <div style={{marginTop:'10px'}}>
              <span 
                className="toggle-link" 
                onClick={() => {
                  setIsModalOpen(false);
                  setNewPw('');
                  setConfirmNewPw('');
                }}
              >
                취소
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default FindPw;