import FuelImg from "../../assets/images/fuel.png"
const FuelProgressBar = ({ fuel }) => {
  const progress = (fuel / 30) * 100;

  const progressBarColor = fuel >= 10 ? "green" : "red";

  // Glow effect when fuel is below 10
  const progressBarGlow =
    fuel < 10 ? "0 0 10px 3px rgba(255, 0, 0, 0.8)" : "none";

  const progressBarStyle = {
    width: `${progress}%`,
    height: "40px",
    backgroundColor: progressBarColor,
    transition: "width 0.3s ease",
    borderRadius: "5px",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "150px",
        animation: fuel < 10 ? "glow 1.5s ease-in-out infinite" : "none",
        boxShadow: progressBarGlow,
        borderRadius: "5px",
      }}
    >
      <div
        style={{ width: "100%", backgroundColor: "#ddd", borderRadius: "5px" }}
      >
        <div style={progressBarStyle}></div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
        <img style={{ width: "30px", height: "30px" }} src={FuelImg} alt="fuel" />
        <strong>{fuel}</strong>
      </div>
    </div>
  );
};

export default FuelProgressBar;
