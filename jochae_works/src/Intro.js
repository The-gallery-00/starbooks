// intro.js
import React, { useState, useEffect } from 'react';
import './Intro.css';   
import logoImage from './starbooks-logo.png'; 
import Login from './Login';
import Signup from './Signup';
import FindPw from './FindPw';

function Intro() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewState, setViewState] = useState('login'); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const CoverContent = () => (
    <>
      <div className="cover-design">
        <img src={logoImage} alt="Logo" className="cover-logo" />
      </div>
      <div className="spine-deco"></div>
    </>
  );

  return (
    <div className="intro-container">
      <div className="book-open">
        
        {/* 왼쪽 페이지 */}
        <div className="static-page left">
          <div className="face-content">
            <CoverContent />
          </div>
        </div>

        {/* 오른쪽 페이지 (변하는 부분) */}
        <div className="static-page right">
          <div className="login-wrapper scroll-enabled">
            
            {viewState === 'login' && (
              <Login 
                onSwitchToSignup={() => setViewState('signup')}
                onSwitchToFindPw={() => setViewState('findPw')}
              />
            )}

            {viewState === 'signup' && (
              <Signup 
                onSwitchToLogin={() => setViewState('login')} 
              />
            )}


            {viewState === 'findPw' && (
              <FindPw 
                onBackToLogin={() => setViewState('login')} 
              />
            )}

          </div>
          <div className="pages-depth right-side"></div>
          <div className="pages-depth bottom-side"></div>
        </div>

        {/* 넘겨지는 페이지 효과 */}
        <div className={`flipping-page ${isFlipped ? 'flipped' : ''}`}>
          <div className="face front">
            <div className="page-content">
              <img src={logoImage} alt="Logo" className="small-logo" />
              <h3>Discover<br/>Your World</h3>
              <p>책을 펼치는 순간<br/>새로운 여행이 시작됩니다.</p>
            </div>
          </div>
          <div className="face back">
            <div className="face-content">
              <CoverContent />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Intro; 