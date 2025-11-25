import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Header.css";
import logoImage from './starbooks-logo.jpg';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // form 기본 제출 방지
    if (searchKeyword.trim() === "") return; // 빈 값이면 무시
    console.log("검색어:", searchKeyword);
    // 실제 검색 페이지로 이동하거나 API 호출
    // 예시: history.push(`/search?query=${searchKeyword}`)
  };

  const toggleSearch = () => setSearchOpen(!searchOpen);
  
  const handleLogout = () => {
  const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      // 필요하다면 추가 로그아웃 로직 수행 (예: 토큰 삭제, API 호출)
      alert("로그아웃 되었습니다.");
    }
    // 아니오 선택 시 아무것도 하지 않음
  };


  return (
    <header className="header-wrapper">
      <div className="header-inner">
        {/* 왼쪽 로고 영역 */}
        <div className="header-logo">
          <Link to="/" className="logo">
            <img src={logoImage} alt="Starbooks" className="logo-img" />
          </Link>
        </div>

        {/* 오른쪽 영역: 상단 유틸리티 + 메뉴 */}
        <div className="header-right">
          {/* 상단 유틸리티 */}
          <div className="header-top">
            <div className="right-utils">
              {isLoggedIn ? (
                <>
                  <Link to="#" onClick={handleLogout} className="auth-link">로그아웃</Link>
                  <span className="divider">|</span>
                  <Link to="/mypage" className="auth-link">마이페이지</Link>
                  <span className="divider">|</span>
                  <Link to="/notification" className="auth-link">알림</Link>
                  <span className="divider">|</span>
                </>
              ) : (
                <>
                  <Link to="/login" className="auth-link">로그인</Link>
                  <span className="divider">|</span>
                  <Link to="/mypage" className="auth-link">마이페이지</Link>
                  <span className="divider">|</span>
                  <Link to="/notification" className="auth-link">알림</Link>
                  <span className="divider">|</span>
                </>
              )}
              {/* 검색 아이콘 + 입력창 */}
              <div className="h-search">
                <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}></form>
                <input
                  type="text"
                  placeholder="통합검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className={searchOpen ? "open" : ""}
                />
                <button className="h-search-btn" onClick={toggleSearch}>
                  <FiSearch className="search-icon" />
                </button>
              </div>

            </div>
          </div>

          {/* 메뉴 영역 */}
          <div className="header-bottom">
            <nav className="nav">
              <Link to="/library">내 서재</Link>
              <Link to="/bookinfo">도서 정보</Link>
              <Link to="/challengeRanking">챌린지·랭킹</Link>
              <Link to="/community">커뮤니티</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
