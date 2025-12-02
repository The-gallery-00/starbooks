import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./PageLocation.css";

export default function PageLocation() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null; // 홈이면 표시 안함

  const displayedPathnames = pathnames.slice(0, 1);

  return (
    <div className="breadcrumb-wrapper">
      <nav className="breadcrumb">
        <Link to="/">홈</Link>
        {displayedPathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

          // URL 세그먼트를 이름으로 변환 (예: mypage -> 마이페이지)
          const displayName = (() => {
            switch (name) {
              case "login": return "로그인";
              case "mypage": return "마이페이지";
              case "notification": return "알림";
              case "library": return "내 서재";
              case "my-bookDetail" : return "내 서재 상세"
              case "bookinfo": return "도서 정보";
              case "info-bookDetail" : return "도서 상세"
              case "challengeRanking": return "챌린지·랭킹";
              case "community": return "커뮤니티";
              case "add-post" : return "커뮤니티 글 작성"
              case "detail-post" : return "커뮤니티 상세"
              default: return name;
            }
          })();

          return (
            <span key={routeTo}>
              {" > "}
              <Link to={routeTo}>{displayName}</Link>
            </span>
          );
        })}
      </nav>
    </div>
  );
}
