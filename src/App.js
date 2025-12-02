import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./UserContext";

import { Header } from "./Header";
import PageLocation from "./PageLocation";
import GlobalSearch from "./GlobalSearch";
import Login from "./Login";
import Home from "./Home";
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

  return (
    <>
      <Header />
      {showPageLocation && <PageLocation />}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/globalsearch" element={<GlobalSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/my-bookDetail" element={<MyBookDetail />} />
          <Route path="/bookinfo" element={<BookInfo />} />
          <Route path="/info-bookDetail" element={<InfoBookDetail />} />
          <Route path="/challengeRanking" element={<ChallengeRanking />} />
          <Route path="/community" element={<CommunityList />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/detail-post/:postId/:postType" element={<DetailPost />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/friend/:id" element={<FriendLibrary />} />
          <Route path="/notification" element={<Notification />} />
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
