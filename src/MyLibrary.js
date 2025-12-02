import React, { useEffect } from 'react';
import ReadingGoal from './ReadingGoal';
import CurrentRanking from './CurrentRanking';
import ReadingCalendar from './ReadingCalendar';
import MyBookList from './MyBookList';
import ReadingRecordList from './ReadingRecordList';
import './MyLibrary.css';
import dummy from './dummy.png';
import MyProfile from './MyPofile';

const myBooks = {
    reading: [
        { id: 1, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#', tab: 'reading' },
        { id: 2, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 3, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 4, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 5, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 6, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 7, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 8, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 9, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 10, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 11, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 12, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 13, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 14, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 15, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 16, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 17, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 18, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
        { id: 19, title: '아몬드', author: '손원평', progress: '75%', cover: dummy, link: '#' },
        { id: 20, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: dummy, link: '#' },
    ],
    finished: [
        { id: 1, title: '아몬드', author: '손원평', progress: '100%', cover: dummy, link: '#' },
        { id: 2, title: '데미안', author: '헤르만 헤세', progress: '100%', cover: dummy, link: '#' },
        { id: 3, title: '아몬드', author: '손원평', progress: '100%', cover: dummy, link: '#' },
        { id: 4, title: '데미안', author: '헤르만 헤세', progress: '100%', cover: dummy, link: '#' },
        { id: 5, title: '아몬드', author: '손원평', progress: '100%', cover: dummy, link: '#' },
    ],
    wishlist: [
        { id: 1, title: '아몬드', author: '손원평', progress: '0%', cover: dummy, link: '#' },
        { id: 2, title: '데미안', author: '헤르만 헤세', progress: '0%', cover: dummy, link: '#' },
        { id: 3, title: '아몬드', author: '손원평', progress: '0%', cover: dummy, link: '#' },
        { id: 4, title: '데미안', author: '헤르만 헤세', progress: '0%', cover: dummy, link: '#' },
        { id: 5, title: '아몬드', author: '손원평', progress: '0%', cover: dummy, link: '#' },
    ]
};
const records = [
    { 
      id: 1,
      bookTitle: "아몬드",
      author: "손원평",
      rating: 4.5,
      date: "2024-11-20",
      summary: "나에게 여전히 아몬드가 있다. 당신에게도 여전히 아몬드가 있다. 가장 소중한 무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도무언가가 있다는 사실만으로도",
    },
    { 
      id: 2, 
      bookTitle: "데미안",
      author: "헤르만 헤세",
      rating: 5,
      date: "2024-11-18",
      summary: "어느 날 아침 문득, 형제의 의미와 나의 내면을 다시 들여다보게 되었던 순간...",
    },
    { 
      id: 3, 
      bookTitle: "지구 끝의 온실",
      author: "김초엽",
      rating: 4.0,
      date: "2024-11-15",
      summary: "기묘하고 아름다운 현상을 탐구하는 과정 속에서 과학적 탐구의 가치에 대해 다시 생각하게 된 기록...",
    },
    { 
      id: 4, 
      bookTitle: "지구 끝의 온실",
      author: "김초엽",
      rating: 4.0,
      date: "2024-11-15",
      summary: "기묘하고 아름다운 현상을 탐구하는 과정 속에서 과학적 탐구의 가치에 대해 다시 생각하게 된 기록...",
    },
    { 
      id: 5, 
      bookTitle: "잃어버린 시간을 찾아서", 
      author: "마르셀 프루스트", 
      rating: 5.0, 
      date: "2024-11-10", 
      summary: "기억의 흐름과 무의식의 세계를 따라가는 깊은 사색의 여정.", 
    },
    { 
      id: 6, 
      bookTitle: "숨", 
      author: "테드 창", 
      rating: 4.8, 
      date: "2024-11-08", 
      summary: "인공지능과 시간 여행을 다루는 흥미로운 SF 단편 모음집.", 
    },
    { 
      id: 7, 
      bookTitle: "숨", 
      author: "테드 창", 
      rating: 4.8, 
      date: "2025-11-08", 
      summary: "인공지능과 시간 여행을 다루는 흥미로운 SF 단편 모음집.", 
    },
    { 
      id: 8, 
      bookTitle: "숨", 
      author: "테드 창", 
      rating: 4.8, 
      date: "2023-11-08", 
      summary: "인공지능과 시간 여행을 다루는 흥미로운 SF 단편 모음집.", 
    },
    { 
      id: 9, 
      bookTitle: "숨", 
      author: "테드 창", 
      rating: 4.8, 
      date: "2022-11-08", 
      summary: "인공지능과 시간 여행을 다루는 흥미로운 SF 단편 모음집.", 
    },
    { 
      id: 10, 
      bookTitle: "숨", 
      author: "테드 창", 
      rating: 4.8, 
      date: "2020-11-08", 
      summary: "인공지능과 시간 여행을 다루는 흥미로운 SF 단편 모음집.", 
    },
  ]

const StatsSection = () => (
  <section className="stats-section">
    <ReadingGoal />
    <CurrentRanking />
    <ReadingCalendar />
  </section>
);

const MyLibrary = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <MyProfile />
        <StatsSection />
        <MyBookList myBooks={myBooks} />
        <ReadingRecordList records={records} />
      </main>
    </div>
  );
};

export default MyLibrary;
