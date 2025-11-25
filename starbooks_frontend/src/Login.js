import React, { useState, useEffect } from 'react';
import './Login.css';
import logoImage from './starbooks-logo.jpg';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Intro() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 1000);
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
        <div className="static-page left">
          <div className="face-content">
            <CoverContent />
          </div>
        </div>

        <div className="static-page right">
          <div className="login-wrapper scroll-enabled">
            {isLoginView ? (
              <LoginForm toggleToSignup={() => setIsLoginView(false)} />
            ) : (
              <SignupForm toggleToLogin={() => setIsLoginView(true)} />
            )}
          </div>
          <div className="pages-depth right-side"></div>
          <div className="pages-depth bottom-side"></div>
        </div>

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
