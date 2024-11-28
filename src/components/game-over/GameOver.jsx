import { useState } from "react";
import HighScores from "./HighScores";
import GameOverForm from "./GameOverForm";

const GameOver = ({ time, stars, handleRestart }) => {
  const [highScores, setHighScores] = useState(null);

  if (highScores) {
    return <HighScores highScores={highScores} handleRestart={handleRestart} />;
  }

  return (
    <GameOverForm setHighScores={setHighScores} time={time} stars={stars} />
  );
};

export default GameOver;
