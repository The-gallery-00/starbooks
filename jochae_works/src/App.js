import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { UserProvider } from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";

import { Header } from "./Header";
import PageLocation from "./PageLocation";
import GlobalSearch from "./GlobalSearch";
import Login from "./Login";
import Intro from "./Intro";
import Home from "./Home"
import MyLibrary from "./MyLibrary";
import MyBookDetail from "./MyBookDetail";
import BookInfo from "./BookInfo";
import InfoBookDetail from "./InfoBookDetail";
import ChallengeRanking from "./ChallengeRanking";
import CommunityList from "./CommunityList";
import AddPost from "./AddPost";
import DetailPost from './DetailPost';
import MyPage from "./MyPage";
import FriendLibrary from "./FriendLibrary";
import Notification from "./Notification";
import TopButton from "./TopButton";

function AppContent() {
  const location = useLocation();

  const showPageLocation = !["/"].includes(location.pathname);

  const showHeader = location.pathname !== "/";

  return (
    <>
      {/* showHeader가 true일 때만 헤더 표시 */}
      {showHeader && <Header />}
      
      {/* showPageLocation이 true일 때만 위치 표시 */}
      {showPageLocation && <PageLocation />}
      
      <div>
        <Routes>
          <Route path="/" element={<Intro />} />

          {/* 로그인 필요 페이지 */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/library" 
            element={
              <ProtectedRoute>
                <MyLibrary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-bookDetail" 
            element={
              <ProtectedRoute>
                <MyBookDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookinfo" 
            element={
              <ProtectedRoute>
                <BookInfo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/info-bookDetail" 
            element={
              <ProtectedRoute>
                <InfoBookDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/challengeRanking" 
            element={
              <ProtectedRoute>
                <ChallengeRanking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/community" 
            element={
              <ProtectedRoute>
                <CommunityList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-post" 
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/detail-post/:postId/:postType" 
            element={
              <ProtectedRoute>
                <DetailPost />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mypage" 
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/friend/:id" 
            element={
              <ProtectedRoute>
                <FriendLibrary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notification" 
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/globalsearch" 
            element={
              <ProtectedRoute>
                <GlobalSearch />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <TopButton />
    </>
  );
}

export default function App() {
  return (
    <Router>
        <UserProvider>
          <AppContent />
        </UserProvider>
    </Router>
  );
}
