import { useState, useEffect, useContext } from 'react';
import './HomeCalendar.css';
import api from './api/axiosInstance';
import { UserContext } from './UserContext';

export function HomeCalendar() {
  const { user } = useContext(UserContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  useEffect(() => {
    if (!user) return;

    const fetchCalendar = async () => {
      try {
        const res = await api.get(`/api/calendar/${user.userId}`, {
          params: { year, month: month + 1 },
        });
        setRecords(res.data);
        console.log("독서 캘린더: ", res.data)
      } catch (error) {
        console.error('독서 캘린더 불러오기 실패:', error);
      }
    };

    fetchCalendar();
  }, [user, year, month]);

  const achievedDays = records
    .filter(r => r.goalAchieved)
    .map(r => new Date(r.date).getDate());

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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
          {['일','월','화','수','목','금','토'].map(w => (
            <div key={w} className="hcl-weekday">{w}</div>
          ))}
        </div>

        <div className="hcl-grid">
          {emptyDays.map(i => <div key={`empty-${i}`} className="hcl-day empty"></div>)}
          {days.map(day => (
            <div 
              key={day} 
              className={`
                hcl-day 
                ${achievedDays.includes(day) ? 'hcl-achieved' : ''} 
                ${day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()
                  ? 'hcl-today' : ''}
              `}
            >
              <span className="hcl-day-number">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
