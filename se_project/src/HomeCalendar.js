import { useState } from 'react';
import './HomeCalendar.css';

export function HomeCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // ✅ 사용자가 목표를 달성한 날만 배열로 지정
  const achievedDays = [3, 8, 12, 20]; // 실제 데이터로 바꿔주세요

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  return (
    <section className="hcl-section">
      <div className="hcl-header">
        <h2 className="hcl-title">독서 캘린더</h2>
        <div className="hcl-controls">
          <button onClick={prevMonth} className="hcl-btn">‹</button>
          <span className="hcl-month">{year}년 {monthNames[month]}</span>
          <button onClick={nextMonth} className="hcl-btn">›</button>
        </div>
      </div>

      <div className="hcl-body">
        <div className="hcl-weekdays">
          {['일','월','화','수','목','금','토'].map(w => <div key={w} className="hcl-weekday">{w}</div>)}
        </div>

        <div className="hcl-grid">
          {emptyDays.map(i => <div key={`empty-${i}`} className="hcl-day empty"></div>)}
          {days.map(day => (
            <div 
              key={day} 
              className={`hcl-day ${achievedDays.includes(day) ? 'hcl-achieved' : ''} ${day === new Date().getDate() && month === new Date().getMonth() ? 'hcl-today' : ''}`}
            >
              <span className="hcl-day-number">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
