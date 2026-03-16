import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReadingCalendar.css';

const readingRecords = [
  { date: '2025-11-01', bookTitle: '아몬드', summary: '첫 독서 기록' },
  { date: '2025-11-08', bookTitle: '숨', summary: 'SF 단편 독서' },
  { date: '2025-11-20', bookTitle: '데미안', summary: '철학적 독서' },
];

const ReadingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    const record = readingRecords.find(
      (r) => r.date === date.toISOString().split('T')[0]
    );
    if (record) {
      setSelectedDate(record);
      alert(`${record.bookTitle}: ${record.summary}`);
    }
  };

  const tileClassName = ({ date, view }) => {
    const today = new Date();
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    if (view === 'month') {
      if (isToday) return 'today';
      if (readingRecords.find((r) => r.date === date.toISOString().split('T')[0]))
        return 'highlight';
    }
  };

  return (
    <div className="calendar-section">
      <h3>독서 캘린더</h3>
      <div className="calendar-display">
        <Calendar
          locale="ko-KR"
          next2Label={null}
          prev2Label={null}
          onClickDay={handleDateClick}
          tileClassName={tileClassName}
          formatDay={(locale, date) => date.getDate()}  // 숫자만 표시
        />
      </div>
    </div>
  );
};

export default ReadingCalendar;
