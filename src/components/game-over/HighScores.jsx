import Clock from "../../assets/images/clock.webp";
import Star from "../../assets/images/star.png";

function HighScores({ highScores, handleRestart }) {
  // Sort and rank high scores
  const rankedScores = [];
  let currentRank = 0;
  let previousStars = null;
  let previousTime = null;

  // Sort highScores by stars (desc) and time (desc)
  const sortedScores = [...highScores].sort((a, b) => {
    if (b.stars !== a.stars) {
      return b.stars - a.stars; // Descending by stars
    }
    return b.time - a.time; // Descending by time
  });

  // Assign ranks
  sortedScores.forEach((score, index) => {
    if (score.stars !== previousStars || score.time !== previousTime) {
      currentRank = index + 1; // Update rank
    }

    rankedScores.push({ ...score, rank: currentRank });

    previousStars = score.stars;
    previousTime = score.time;
  });
  return (
    <div className="high-score-container">
      <div>
        <h2 className="title">High Scores</h2>
        <div className="high-scores-table-container">
          <table className="high-score-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>
                  <img className="icon" src={Star} />
                </th>
                <th>
                  <img className="icon" src={Clock} />
                </th>
              </tr>
            </thead>
            <tbody>
              {rankedScores.map((score) => (
                <tr key={score._id}>
                  <td>{score.rank}</td>
                  <td>{score.name}</td>
                  <td>{score.stars}</td>
                  <td>{score.time}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleRestart}>Play Again</button>
      </div>
    </div>
  );
}

export default HighScores;
