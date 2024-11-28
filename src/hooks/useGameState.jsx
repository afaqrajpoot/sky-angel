import { useCallback } from "react";
import { useState, useEffect } from "react";

export const useGameState = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [fuel, setFuel] = useState(10);
  const [stars, setStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [birdsSpeed, setBirdsSpeed] = useState(180);
  const [cloudsSpeed, setCloudsSpeed] = useState(110);
  const [aircraftSpeed, setAircraftSpeed] = useState(5);

  const handlePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {setElapsedTime((time) => time + 1)
        setFuel((prev) => {
          const newFuel = prev - 1;
          if (newFuel <= 0) {
            setGameOver(true);
            return 0;
          }
          return newFuel;
        })
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  return {
    isPaused,
    handlePause,
    setElapsedTime,
    fuel,
    setFuel,
    stars,
    setStars,
    gameOver,
    setGameOver,
    elapsedTime,
    isMute,
    setIsMute,
    birdsSpeed,
    setBirdsSpeed,
    cloudsSpeed,
    setCloudsSpeed,
    aircraftSpeed, setAircraftSpeed
  };
};
