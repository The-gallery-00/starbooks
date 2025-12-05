import { useState, useEffect, useContext } from 'react';
import './ReadingCalendar.css';
import api from './api/axiosInstance';
import { UserContext } from './UserContext';

export function ReadingCalendar() {
  const { user } = useContext(UserContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // JS 월은 0~11, API는 1~12

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  useEffect(() => {
    if (!user) return;

    const fetchCalendar = async () => {
      try {
        const res = await api.get(`/api/calendar/${user.userId}`, {
          params: { year, month }
        });

        setRecords(res.data); // ReadingCalendarDayDto 배열
      } catch (error) {
        console.error('독서 캘린더 불러오기 실패:', error);
      }
    };

    fetchCalendar();
  }, [user, year, month]);

  // 달성일만 필터
  const achievedDays = records
    .filter(r => r.goalAchieved)
    .map(r => new Date(r.date).getDate());

    useEffect(() => {
      console.log("📌 이번 달 달성일:", achievedDays);
    }, [achievedDays]);

    

  const prevMonth = () => setCurrentDate(new Date(year, month - 2));
  const nextMonth = () => setCurrentDate(new Date(year, month));

  const monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  return (
    <section className="calendar-section">
      <h3>독서 캘린더</h3>
      <p className="rc-calendar-text">독서 목표에 달성한 날을 확인해보세요!</p>
      <div className="rc-calendar-header">
        <div className="rc-calendar-controls">
          <button onClick={prevMonth} className="rc-calendar-btn">‹</button>
          <span className="rc-calendar-month">{year}년 {monthNames[month - 1]}</span>
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
              className={`rc-calendar-day ${achievedDays.includes(day) ? 'rc-calendar-achieved' : ''} ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear() ? 'rc-calendar-today' : ''}`}
            >
              <span className="rc-calendar-day-number">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
