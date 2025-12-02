import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Header.css";
import logoImage from "./starbooks-logo.png";
import { UserContext } from "./UserContext";

export function Header() {
  const navigate = useNavigate();
  const { user, toggleUser } = useContext(UserContext);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchKeyword.trim();
    if (keyword === "") return;

    // 검색 결과 페이지로 이동 (쿼리 파라미터로 전달)
    navigate(`/globalsearch?query=${encodeURIComponent(keyword)}`);
  };


  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      toggleUser();
      alert("로그아웃 되었습니다.");
    }
  };

  return (
    <header className="h-header">
      {/* ===== Top Bar ===== */}
      <div className="h-top-bar">
        <div className="h-top-bar-container">
          <div className="h-top-bar-menu">
            {user ? (
              <>
                <Link to="#" onClick={handleLogout} className="h-auth-link">로그아웃</Link>
                <span className="h-divider">|</span>
                <Link to="/mypage" className="h-auth-link">마이페이지</Link>
                <span className="h-divider">|</span>
                <Link to="/notification" className="h-auth-link">알림</Link>
                <span className="h-divider">|</span>
              </>
            ) : (
              <>
                <Link to="/login" className="h-auth-link">로그인</Link>
                <span className="h-divider">|</span>
                <Link to="/mypage" className="h-auth-link">마이페이지</Link>
                <span className="h-divider">|</span>
                <Link to="/notification" className="h-auth-link">알림</Link>
                <span className="h-divider">|</span>
              </>
            )}

            {/* 통합검색 버튼 */}
            <div className="h-search">
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="통합검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className={searchOpen ? "open" : ""}
                />
                <button className="h-search-btn" onClick={toggleSearch}>
                  <FiSearch className="h-search-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main Header ===== */}
      <div className="main-header">
        <div className="main-header-container">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={logoImage} alt="Starbooks" className="logo-img" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="h-nav">
            <Link to="/library">
              내 서재
            </Link>
            <Link to="/bookinfo">
              도서 정보
            </Link>
            <Link to="/challengeRanking">
              챌린지·랭킹
            </Link>
            <Link to="/community">
              커뮤니티
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
