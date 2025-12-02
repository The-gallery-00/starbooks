import React from 'react';
import { HomeMyReadingList } from './HomeMyReadingList';
import { HomeCalendar }  from './HomeCalendar';
import { HomePopularBooks } from './HomePopularBooks';
import  { HomeChallenge }  from './HomeChallenge';
import  { HomeCommunity }  from './HomeCommunity';
import { HomeRanking } from './HomeRanking';
import './Home.css';
import BookShelfImage from './BookShelfImage.png'

export default function Home() {
  return (
    <div className="home-app">
      {/* Hero Section */}
      <div className="home-hero-section">
        <img
          src={BookShelfImage}
          alt="Cozy bookstore"
          className="home-hero-image"
        />        
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h2 className="home-hero-title">따뜻한 독서의 시간</h2>
            <p className="home-hero-subtitle">당신의 책장을 채워가세요</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="home-main-content">
        <div className="home-content-container">
          {/* Left */}
          <div className="home-left-column">
            <HomeMyReadingList />
            <HomeChallenge />
            <HomeCommunity />
          </div>

          {/* Right */}
          <div className="home-right-column">
            <HomeCalendar />
            <HomePopularBooks />
            <HomeRanking />
          </div>
        </div>
      </main>
    </div>
  );
}
