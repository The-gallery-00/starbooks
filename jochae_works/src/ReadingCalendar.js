import { useState } from 'react';
import './ReadingCalendar.css';

const readingRecords = [
  { date: '2025-11-01', bookTitle: '아몬드', summary: '첫 독서 기록' },
  { date: '2025-11-08', bookTitle: '숨', summary: 'SF 단편 독서' },
  { date: '2025-11-20', bookTitle: '데미안', summary: '철학적 독서' },
];

export function ReadingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // 해당 달의 달성일만 필터
  const achievedDays = readingRecords
    .filter(r => new Date(r.date).getMonth() === month && new Date(r.date).getFullYear() === year)
    .map(r => new Date(r.date).getDate());

  const handleDayClick = (day) => {
    const record = readingRecords.find(r => new Date(r.date).getFullYear() === year &&
                                            new Date(r.date).getMonth() === month &&
                                            new Date(r.date).getDate() === day);
    if (record) {
      alert(`${record.bookTitle}: ${record.summary}`);
    }
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  return (
    <section className="calendar-section">
      <h3>독서 캘린더</h3>
      <p className="rc-calendar-text">독서 목표에 달성한 날을 확인해보세요!</p>
        <div className="rc-calendar-header">
          <div className="rc-calendar-controls">
            <button onClick={prevMonth} className="rc-calendar-btn">‹</button>
            <span className="rc-calendar-month">{year}년 {monthNames[month]}</span>
            <button onClick={nextMonth} className="rc-calendar-btn">›</button>
          </div>
        </div>

      <div className="rc-calendar-display">
        <div className="rc-calendar-weekdays">
          {['일','월','화','수','목','금','토'].map(w => (
            <div key={w} className="calendar-weekday">{w}</div>
          ))}
        </div>

        <div className="rc-calendar-grid">
          {emptyDays.map(i => <div key={`empty-${i}`} className="rc-calendar-day empty"></div>)}
          {days.map(day => (
            <div
              key={day}
              className={`rc-calendar-day ${achievedDays.includes(day) ? 'rc-calendar-achieved' : ''} ${day === new Date().getDate() && month === new Date().getMonth() ? 'rc-calendar-today' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <span className="rc-calendar-day-number">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
