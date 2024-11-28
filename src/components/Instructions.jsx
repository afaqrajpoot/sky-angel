const instructions = [
  {
    id: 3,
    content:
      "Birds: Watch out for birds flying across the sky. If the aircraft collides with a bird, the game is over.",
  },
  {
    id: 4,
    content:
      "Parachutes: Collecting parachutes will add 10 points to your fuel (10 more seconds of flight).",
  },
  {
    id: 5,
    content:
      "Stars: Each collected star will increase your star score counter by 1.",
  },
  {
    id: 6,
    content:
      "Pause: You can pause the game by clicking the pause button or by pressing the spacebar.",
  },
];

function Instructions({ handleStartGame }) {
  return (
    <section className="instructions-container">
      <h2 className="game-title">Sky Angel</h2>
      <div>
        <h4 className="instructions-title">Instructions</h4>
        <ul className="instructions">
          <li>
            Arrow Keys: <br />
            Left Arrow: Move the aircraft to the left. <br />
            Right Arrow: Move the aircraft to the right. <br />
            Up Arrow: Move the aircraft up. <br />
            Down Arrow: Move the aircraft down.
          </li>
          {instructions.map((info) => (
            <li key={info.id}>{info.content}</li>
          ))}
        </ul>
      </div>
      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </section>
  );
}

export default Instructions;
