import { Link } from "react-router-dom"; 
import './HomeChallenge.css';

export function HomeChallenge() {
  const challenges = [
    { id: 1, title: '한 달 5권 읽기 챌린지', description: '매달 5권의 책을 읽어보세요', participants: 1234, daysLeft: 15, progress: 60 },
    { id: 2, title: '클래식 독서 마라톤', description: '고전 명작을 함께 읽어요', participants: 856, daysLeft: 23, progress: 35 },
    { id: 3, title: '매일 30분 독서', description: '하루 30분씩 꾸준히 읽기', participants: 2341, daysLeft: 8, progress: 75 }
  ].sort((a, b) => b.participants - a.participants);

  return (
    <section className="hc-section">
      <div className="hc-header">
        <h2 className="hc-title">진행 중인 챌린지</h2>
        <Link to="/challengeRanking" className="hc-more-btn">더보기</Link>
      </div>

      <div className="hc-grid">
        {challenges.map(challenge => (
          <div key={challenge.id} className="hc-card">
            <div className="hc-card-top">
              <div className="hc-badge">D-{challenge.daysLeft}</div>
            </div>
            <div className="hc-card-content">
              <h3 className="hc-card-title">{challenge.title}</h3>
              <p className="hc-card-desc">{challenge.description}</p>
              <div className="hc-progress-wrapper">
                <div className="hc-progress-bar">
                  <div className="hc-progress-fill" style={{ width: `${challenge.progress}%` }} />
                </div>
                <span className="hc-progress-text">{challenge.progress}%</span>
              </div>
              <div className="hc-participants">
                {challenge.participants.toLocaleString()}명 참여 중
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
