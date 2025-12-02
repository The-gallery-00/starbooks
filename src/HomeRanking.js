import profile from './profile.jpg';
import './HomeRanking.css';

export function HomeRanking() {
  const topReaders = [
    { id: 1, rank: 1, name: 'AAA', booksRead: 127, avatar: profile },
    { id: 2, rank: 2, name: 'BBB', booksRead: 98, avatar: profile },
    { id: 3, rank: 3, name: 'CCC', booksRead: 89, avatar: profile },
    { id: 4, rank: 4, name: 'DDD', booksRead: 76, avatar: profile },
    { id: 5, rank: 5, name: 'TTT', booksRead: 71, avatar: profile }
  ];

  const getRankSymbol = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <section className="hrg-section">
      <div className="hrg-header">
        <h2>다독 순위</h2>
        {/* <button className="hrg-more-btn">더보기 ›</button> */}
      </div>

      <div className="hrg-readers">
        {topReaders.map(reader => (
          <div key={reader.id} className="hrg-reader-card">
            <div className="hrg-reader-rank">{getRankSymbol(reader.rank)} {reader.rank}</div>
            <img src={reader.avatar} alt={reader.name} className="hrg-reader-avatar"/>
            <div className="hrg-reader-info">
              <h4 className="hrg-reader-name">{reader.name}</h4>
              <span className="hrg-books-read">{reader.booksRead}권</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
