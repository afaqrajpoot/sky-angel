import { useState } from "react";
import { register } from "../../api";
import LoadingSpinner from "../ui/loading-spinner/LoadingSpinner";
import Clock from "../../assets/images/clock.webp";
import Star from "../../assets/images/star.png";

function GameOverForm({ setHighScores, time, stars }) {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const highScores = await register(playerName, stars, time);
    if (highScores.data) {
      setHighScores(highScores.data);
    } else {
      setError("Something went wrong, please try again");
    }
    setIsLoading(false);
  };

  return (
    <div className="game-over-container">
      <div className="game-over">
        <h2 className="title">Game Over</h2>
        <h3>Your score</h3>
        <div className="time">
          <img className="icon" src={Clock} alt="clock/time" />:
          <p>{time} seconds</p>
        </div>
        <div className="stars">
          <img className="icon" src={Star} alt="star" />:<p>{stars}</p>
        </div>
        <form className="game-over-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="game-over-input"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              transition: "all",
              marginTop: "1rem",
              opacity: playerName.trim() === "" || isLoading ? 0.5 : 1,
              pointerEvents:
                playerName.trim() === "" || isLoading ? "none" : "auto",
            }}
          >
            {isLoading ? <LoadingSpinner /> : "Save Score"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GameOverForm;
