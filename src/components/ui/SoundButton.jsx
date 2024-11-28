import OnMute from "../../assets/images/mute.png";
import OnPlay from "../../assets/images/sound.svg";

const SoundComponent = ({ isMute, toggleMute }) => {
  return (
    <button onClick={toggleMute} style={{ background: "none", border: "none", cursor: "pointer" }}>
      {isMute ? (
        <img className="icon" src={OnMute} alt="sound off / mute"/>
      ) : (
        <img className="icon" src={OnPlay} alt="sound on"/>
      )}
    </button>
  );
};

export default SoundComponent;
