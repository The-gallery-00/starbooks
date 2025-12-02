// src/UserContext.js
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 초기 상태: 하드코딩된 로그인 정보
    const mockUser = {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      role: "user"
    };
    setUser(mockUser);

    // 실제 서버 연결 코드 (주석 처리)
    /*
    const token = localStorage.getItem("token");
    if (token) {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;
      fetch(`${BASE_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
    }
    */
  }, []);

  // 실제 서버 연결 코드 시 필요
//   const logout = () => {
//     localStorage.removeItem("token"); // 토큰 삭제
//     setUser(null);
//   };

  // 테스트용 로그인/로그아웃 함수
  const toggleUser = () => {
    if (user) {
      setUser(null); // 로그아웃
    } else {
      setUser({
        id: 1,
        name: "홍길동",
        email: "hong@example.com",
        role: "user"
      }); // 로그인
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleUser }}>
      {children}
    </UserContext.Provider>
  );

  // 실제 코드 연결 용
//   return (
//     <UserContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
};
