import "./App.css";
import { useState } from "react";
import Instructions from "./components/Instructions";
import Cloud from "./assets/images/cloud.png";
import GameDisplay from "./components/game-display/GameDisplay";
import GameOver from "./components/game-over/GameOver";
function App() {
  const [gameState, setGameState] = useState("instructions");
  const [stars, setStars] = useState(0);
  const [time, setTime] = useState(0);

  const handleStartGame = () => {
    setGameState("playing");
  };

  const handleGameOver = (finalTime, finalStars) => {
    setTime(finalTime);
    setStars(finalStars);
    setGameState("game-over");
  };

  const handleRestart = () => {
    setGameState("instructions");
    setTime(0);
    setStars(0);
  };
  return (
    <main className="app-container">
      <div className="background-clouds">
        <img className="cloud-background cloud-animations" src={Cloud} alt="cloud" />
        <img className="cloud-background cloud-animations" src={Cloud} alt="cloud" />
      </div>
      <section className="game-container">
        {gameState === "instructions" && (
          <>
            <div className="instructions-clouds">
              <img
                className="instructions-clouds-item-1 cloud-animations"
                src={Cloud}
                alt="cloud"
              />
              <img className="cloud-background cloud-animations" src={Cloud} alt="cloud" />
            </div>
            <div className="game-instructions">
              <Instructions handleStartGame={handleStartGame} />
            </div>
          </>
        )}

        {gameState === "playing" && (
          <GameDisplay
            isGameStarted={true}
            handleGameOver={handleGameOver}
          />
        )}

        {gameState === "game-over" && (
          <GameOver time={time} stars={stars} handleRestart={handleRestart} />
        )}
      </section>
    </main>
  );
}

export default App;
