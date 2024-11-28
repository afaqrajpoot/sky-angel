import Clock from "../../assets/images/clock.webp";
import Star from "../../assets/images/star.png";

function HighScores({ highScores, handleRestart }) {
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
              {highScores.map((score, index) => (
                <tr key={score._id}>
                  <td>{index + 1}</td>
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
