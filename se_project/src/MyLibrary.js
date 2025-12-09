import React, { useEffect } from 'react';
import ReadingGoal from './ReadingGoal';
import CurrentRanking from './CurrentRanking';
import { ReadingCalendar } from './ReadingCalendar';
import MyBookList from './MyBookList';
import ReadingRecordList from './ReadingRecordList';
import './MyLibrary.css';
import MyProfile from './MyProfile';

export const myBooks = {
    reading: [
      { id: 1, title: '소년이 온다', author: '한강', progress: '75%', cover: "https://image.aladin.co.kr/product/4086/97/cover/8936434128_2.jpg", link: '#',
        allPages: 216, 
        description: '섬세한 감수성과 치밀한 문장으로 인간 존재의 본질을 탐구해온 작가 한강의 여섯번째 장편소설. 상처의 구조에 대한 투시와 천착의 서사를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명한다.'
       },
      { id: 2, title: '데미안', author: '헤르만 헤세', progress: '25%', cover: "https://img1.daumcdn.net/thumb/R1280x0.fwebp/?fname=http://t1.daumcdn.net/brunch/service/user/7H8p/image/MsFtcopMcsD1h86nbkxGzcjv0mo.JPG", link: '#',
        allPages: 200,
        description: '2차 세계대전 중 많은 독일 젊은이들이 전장에 나가면서 군복 주머니 속에 품고 갔던 책. 어른이 되기 위해 보이지 않는 껍질을 깨고 고통스런 현실의 세계로 나서는 젊은이들을 그렸다. 지금까지도 젊은이들에게 통과의례처럼 읽히고 있는 명작을 새로 옮겼다.'
       },
    ],
    finished: [
      { id: 11, title: '아몬드', author: '손원평', progress: '100%', cover: "https://image.yes24.com/goods/37300128/XL", link: '#',
        allPages: 200,
        description: '제10회 창비청소년문학상 수상작. ‘감정을 느끼지 못하는’ 소년의 특별한 성장 이야기로, 첫 장부터 강렬한 사건으로 시작해 다음 페이지가 궁금해지게 만드는 흡입력 강한 작품이다. 타인의 감정에 무감각해진 ‘공감 불능’인 이 시대에 큰 울림을 준다.'
       },
      { id: 12, title: '나미야 잡화점의 기적', author: '히가시노 게이고', progress: '100%', cover: "https://image.aladin.co.kr/product/15848/6/cover/k622533431_1.jpg", link: '#',
        allPages: 300,
        description: '2012년 12월 19일 국내 번역 출간된 이래 6년 연속 베스트셀러 순위 상위권을 차지하며 서점가에서 "21세기 가장 경이로운 베스트셀러"라고 불리는 소설. 2008~2017년, 지난 10년간 한국에서 가장 많이 팔린 소설, 히가시노 게이고의 대표작 <나미야 잡화점의 기적>이 국내 누적 판매 100만 부를 돌파했다.'
       },
      { id: 13, title: '대온실 수리 보고서', author: '김금희', progress: '100%', cover: "https://image.aladin.co.kr/product/34712/24/cover200/8936439650_2.jpg", link: '#',
        allPages: 150,
        description: '창경궁 대온실을 둘러싼 가슴 저릿한 역사와 미완으로 남은 인간의 소망을 재건하는 아름다운 시도 마침내 탄생한 김금희의 역작!이야기의 아름다움을 증명해온 소설가 김금희가 장편소설 『대온실 수리 보고서』를 선보인다. 살아남은 역사의 잔재인 창경궁 대온실을 배경으로 한 가슴 아픈 역사와 인간에 대한 믿음을 저버리지 않으려는 신념을 감동적으로 보여주는 작품으로, 김금희 소설세계를 한차원 새롭게 열며 근래 보기 드문 풍성한 장편소설의 진면목을 보여주는 대작이다. 30대 여성 ‘영두’가 창경궁 대온실 보수공사의 백서를 기록하는 일을 맡게 되면서 이야기는 시작된다. 영두는 석모도 출신으로, 중학생 때 창덕궁 담장을 따라 형성된 서울의 동네인 원서동에서 유학을 한 경험이 있다. 어떤 이유 때문인지 ‘창경궁’이라는 말을 듣고는 마음이 서늘해지는 것을 느끼며 처음엔 백서를 기록하는 일을 맡기를 꺼린다. 그곳에서 아주 크게 인생이 꺾이는 일이 있었다는 듯이.'
       },
      { id: 14, title: '불편한 편의점', author: '김호연', progress: '100%', cover: "https://image.aladin.co.kr/product/26942/84/cover/k582730818_1.jpg", link: '#',
        allPages: 200,
        description: '<망원동 브라더스>의 작가 김호연의 동네이야기 시즌 2. 청파동 골목 모퉁이에 자리 잡은 작은 편의점을 무대로 힘겨운 시대를 살아가는 우리 이웃들의 삶의 속내와 희로애락을 따뜻하고 유머러스하게 담아냈다.'
       },
    ],
    wishlist: [
      { id: 21, title: '절창', author: '구병모', progress: '0%', cover: "https://image.aladin.co.kr/product/37172/36/cover200/k662031678_1.jpg", link: '#',
        allPages: 200,
        description: '더이상의 수식이 필요치 않은 작가, 그 이름이 하나의 브랜드가 된 구병모의 장편소설 『절창』이 문학동네에서 출간되었다. 제목인 ‘절창切創’은 ‘베인 상처’라는 뜻으로, 상처에 접촉하는 것으로 상대의 마음을 읽는 한 여성의 이야기를 담고 있다.'
       },
    ]
};
const records = [
  { 
    id: 11,
    bookTitle: "아몬드",
    author: "손원평",
    rating: 4,
    date: "2025-11-20",
    summary: "나에게 여전히 아몬드가 있다. 당신에게도 여전히 아몬드가 있다. 가장 소중한 무언가가 있다는 사실만으로도",
  },
  { 
    id: 12,
    bookTitle: "나미야 잡화점의 기적",
    author: "히가시노 게이고",
    rating: 5,
    date: "2025-10-15",
    summary: "과거와 현재가 얽힌 특별한 잡화점 이야기. 다양한 사연을 가진 사람들이 마주하며 변화하는 이야기.",
  },
  { 
    id: 13,
    bookTitle: "대온실 수리 보고서",
    author: "김금희",
    rating: 5,
    date: "2025-09-30",
    summary: "장편소설로, 사람과 사물의 관계를 세심하게 관찰하며 그 속의 이야기를 담아낸 작품.",
  },
  { 
    id: 14,
    bookTitle: "불편한 편의점",
    author: "김호연",
    rating: 4,
    date: "2025-08-10",
    summary: "작은 편의점에서 벌어지는 일상을 통해 인간의 내면과 관계를 섬세하게 그려낸 장편소설.",
  },
];


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
