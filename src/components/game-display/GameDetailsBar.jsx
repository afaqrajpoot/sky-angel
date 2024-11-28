import FuelProgressBar from "./ProgressBar";
import star from "../../assets/images/star.png";
import clock from "../../assets/images/clock.webp";
function GameDetailsBar({ fuel, stars, time }) {
  return (
    <div className="game-details-bar">
      <FuelProgressBar fuel={Math.ceil(fuel)} />
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img
          style={{ width: "2.5rem", height: "2.5rem" }}
          src={star}
          alt="starts"
        />{":"}
        <strong style={{fontSize:"1.5rem"}}>{stars}</strong>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img
          style={{ width: "2.5rem", height: "2.5rem" }}
          src={clock}
          alt="stars"
        />{":"}
        <strong style={{fontSize:"1.5rem"}}>{time}s</strong>
      </div>
    </div>
  );
}

export default GameDetailsBar;
