import { useEffect, useRef, useState, useCallback } from "react";
import aircraftImg from "../../assets/images/aircraft.png";
import birdImg from "../../assets/images/bird.png";
import cloudImg from "../../assets/images/cloud.png";
import starImg from "../../assets/images/star.png";
import parachuteImg from "../../assets/images/parachute.png";
import StarSound from "../../assets/sounds/star-sound.wav";
import GameOverSound from "../../assets/sounds/game-over.wav";
import ParachuteSound from "../../assets/sounds/parachute-sound.wav";
import { checkInteraction } from "../../utils/utils";
import GameDetailsBar from "./GameDetailsBar";
import SoundComponent from "../ui/SoundButton";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useMediaAssets } from "../../hooks/useMediaAssets";
import { useGameState } from "../../hooks/useGameState";
import useGameItems from "../../hooks/useGameItems";

// Sounds
const starSound = new Audio(StarSound);
const parachuteSound = new Audio(ParachuteSound);
const gameOverSound = new Audio(GameOverSound);

const imageUrls = {
  aircraft: aircraftImg,
  bird: birdImg,
  cloud: cloudImg,
  star: starImg,
  parachute: parachuteImg,
};

const width = 1024;
const height = 768;

const GameDisplay = ({ isGameStarted, handleGameOver }) => {
  const {
    isPaused,
    handlePause,
    fuel,
    setFuel,
    stars,
    setStars,
    gameOver,
    setGameOver,
    elapsedTime,
    aircraftSpeed,
    setAircraftSpeed,
    birdsSpeed,
    setBirdsSpeed,
    cloudsSpeed,
    setCloudsSpeed,
  } = useGameState();

  // States
  const [isMute, setIsMute] = useState(false);

  // Play Sound
  useEffect(() => {
    if (!isMute) {
      starSound.play();
    }
  }, [stars]);

  const toggleMute = () => {
    setIsMute((prevMute) => !prevMute);
  };

  // Increase Speed by time
  useEffect(() => {
    if (elapsedTime > 0 && elapsedTime % 10 === 0) {
      setAircraftSpeed((prevSpeed) => prevSpeed + 0.5);
      setBirdsSpeed((prevSpeed) => prevSpeed + 50);
      setCloudsSpeed((prevSpeed) => prevSpeed + 50);
    }
  }, [elapsedTime]);

  // Refs
  const canvasRef = useRef(null);
  const aircraftPositionRef = useRef({ x: 10, y: height / 2 });
  const tiltAngleRef = useRef(0);
  const frameIdRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const gameLoopRef = useRef(null);

  const checkInteractions = useCallback(() => {
    const aircraftRect = {
      ...aircraftPositionRef.current,
      width: 160,
      height: 63,
    };
    const { birds, parachutes, stars } = gameItemsRef.current;

    birds.forEach((bird) => {
      const birdRect = { ...bird, width: 100, height: 60 };
      if (checkInteraction(aircraftRect, birdRect)) setGameOver(true);
    });

    parachutes.forEach((parachute, index) => {
      const parachuteRect = { ...parachute, width: 80, height: 80 };
      if (checkInteraction(aircraftRect, parachuteRect)) {
        handleCollectParachutes(fuel);
        if (!isMute) {
          parachuteSound.play();
        }
        parachutes[index] = { x: Math.random() * (width - 30), y: 0 }; // re-render another parachute
      }
    });

    stars.forEach((star, index) => {
      const starRect = { ...star, width: 50, height: 50 };
      if (checkInteraction(aircraftRect, starRect)) {
        setStars((prev) => prev + 1);
        stars[index] = { x: Math.random() * (width - 20), y: 0 }; // re-render another star
      }
    });
  }, [width, fuel]);

  const { gameItemsRef, updateGame } = useGameItems({
    isPaused,
    gameOver,
    width,
    height,
    birdsSpeed,
    cloudsSpeed,
    fuel,
    setFuel,
    setGameOver,
    checkInteractions,
  });
  const handleCollectParachutes = (fuel) => {
    // Fuel Max 30
    if (fuel < 30) {
      if (fuel >= 20) {
        setFuel(30);
      } else {
        setFuel((prev) => prev + 10);
      }
    } else {
      setFuel((prev) => prev);
    }
  };

  const paintGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;

    ctx.clearRect(0, 0, width, height);

    if (images.background) {
      ctx.drawImage(images.background, 0, 0, width, height);
    }

    gameItemsRef.current.clouds.forEach((cloud) => {
      if (images.cloud) {
        ctx.globalAlpha = 0.5; // opacity .5 for cloud
        ctx.drawImage(images.cloud, cloud.x, cloud.y, 300, 150);
        ctx.globalAlpha = 1.0; // opacity 1 for the rest of screen
      }
    });

    // Draw the stars
    gameItemsRef.current.stars.forEach((star) => {
      if (images.star) ctx.drawImage(images.star, star.x, star.y, 50, 50);
    });

    // Draw the parachutes
    gameItemsRef.current.parachutes.forEach((parachute) => {
      if (images.parachute)
        ctx.drawImage(images.parachute, parachute.x, parachute.y, 80, 80);
    });

    // Draw the birds
    gameItemsRef.current.birds.forEach((bird) => {
      if (images.bird) ctx.drawImage(images.bird, bird.x, bird.y, 100, 60);
    });

    // Draw the aircraft
    if (images.aircraft) {
      const tilt = tiltAngleRef.current;
      const { x, y } = aircraftPositionRef.current;

      ctx.save();

      ctx.translate(x + 80, y + 31.5);

      ctx.rotate((tilt * Math.PI) / 180);

      ctx.drawImage(images.aircraft, -80, -31.5, 160, 63);

      ctx.restore();
    }
  }, [width, height]);

  const animationLoop = useCallback(
    (timestamp) => {
      if (isPaused || gameOver) return;

      if (lastUpdateTimeRef.current === 0) {
        lastUpdateTimeRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastUpdateTimeRef.current) / 1000;
      lastUpdateTimeRef.current = timestamp;

      updateGame(deltaTime);
      paintGame();
      frameIdRef.current = requestAnimationFrame(animationLoop);
    },
    [updateGame, paintGame, isPaused, gameOver]
  );

  const runAnimationLoop = useCallback(() => {
    if (!frameIdRef.current) {
      lastUpdateTimeRef.current = 0;
      frameIdRef.current = requestAnimationFrame(animationLoop);
    }
  }, [animationLoop]);

  const pauseAnimationLoop = useCallback(() => {
    if (frameIdRef.current) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }
  }, []);

  // Custom Hooks
  const imagesRef = useMediaAssets(
    imageUrls,
    isGameStarted,
    runAnimationLoop,
    pauseAnimationLoop
  );
  const dd = useKeyPress(handlePause);

  // Effects
  useEffect(() => {
    if (isPaused) {
      pauseAnimationLoop();
    } else {
      runAnimationLoop();
    }
  }, [isPaused, runAnimationLoop, pauseAnimationLoop]);

  useEffect(() => {
    const updateAircraftPosition = () => {
      if (isPaused) return;

      const { x, y } = aircraftPositionRef.current;
      let dx = 0;
      let dy = 0;

      if (dd.current["ArrowUp"]) {
        dy -= aircraftSpeed;
        tiltAngleRef.current = -20; // Tilt up
      } else if (dd.current["ArrowDown"]) {
        dy += aircraftSpeed;
        tiltAngleRef.current = 20; // Tilt down
      } else {
        tiltAngleRef.current = 0; // Neutral tilt when no arrow keys are pressed
      }
      if (dd.current["ArrowLeft"]) dx -= aircraftSpeed;
      if (dd.current["ArrowRight"]) dx += aircraftSpeed;

      aircraftPositionRef.current = {
        x: Math.max(0, Math.min(width - 160, x + dx)),
        y: Math.max(80, Math.min(height - 63, y + dy)),
      };
    };

    gameLoopRef.current = setInterval(updateAircraftPosition, 16); // for 60 fps

    return () => {
      clearInterval(gameLoopRef.current);
    };
  }, [isPaused, height, width, handlePause, aircraftSpeed]);

  useEffect(() => {
    if (gameOver) {
      if (!isMute) {
        gameOverSound.play();
      }
      pauseAnimationLoop();
      handleGameOver(elapsedTime, stars);
    }
  }, [gameOver, handleGameOver, fuel, stars, pauseAnimationLoop]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        position: "relative",
        borderRadius: "20px",
      }}
    >
      <GameDetailsBar fuel={fuel} stars={stars} time={elapsedTime} />
      <canvas ref={canvasRef} width={width} height={height} />

      {isPaused && (
        <div className="overlay-pause">
          <button onClick={handlePause}>Resume</button>
        </div>
      )}
      {!isPaused && (
        <div className="game-options">
          <button onClick={handlePause}>Pause</button>
          <SoundComponent toggleMute={toggleMute} isMute={isMute} />
        </div>
      )}
    </div>
  );
};

export default GameDisplay;
