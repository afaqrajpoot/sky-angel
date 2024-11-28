import { useRef } from "react";
import { useCallback } from "react";

function useGameItems({
  isPaused,
  gameOver,
  width,
  height,
  birdsSpeed,
  cloudsSpeed,
  fuel,
  checkInteractions,
}) {
  const gameItemsRef = useRef({
    birds: Array(2)
      .fill()
      .map(() => ({
        x: width,
        y: Math.random() * (height - 100),
      })),
    clouds: Array(3)
      .fill()
      .map(() => ({
        x: Math.random() * width,
        y: Math.random() * (height - 50),
      })),
    stars: Array(2)
      .fill()
      .map(() => ({
        x: Math.random() * (width - 20),
        y: Math.random() * height,
      })),
    parachutes: [
      { x: Math.random() * (width - 30), y: Math.random() * height },
    ],
  });

  const updateGame = useCallback(
    (deltaTime) => {
      if (isPaused || gameOver) return;

      const { birds, clouds, stars, parachutes } = gameItemsRef.current;

      birds.forEach((bird) => {
        bird.x -= birdsSpeed * deltaTime;
        if (bird.x + 100 < -30) {
          bird.x = width;
          bird.y = Math.random() * (height + 20);
        }
      });

      clouds.forEach((cloud) => {
        cloud.x -= cloudsSpeed * deltaTime;
        if (cloud.x < -400) {
          cloud.x = width;
          cloud.y = Math.random() * (height - 50);
        }
      });

      stars.forEach((star) => {
        star.y += 200 * deltaTime;
        if (star.y - 100 > height) {
          star.x = Math.random() * (width - 20);
          star.y = 0;
        }
      });

      parachutes.forEach((parachute) => {
        parachute.y += 230 * deltaTime;

        // Make parachute drift
        const horizontalSpeed = -100;
        parachute.x += horizontalSpeed * deltaTime;

        parachute.x = Math.max(0, Math.min(width - 30, parachute.x));

        if (parachute.y - 100 > height) {
          parachute.x = Math.random() * (width - 30);
          parachute.y = 0;
        }
      });
      checkInteractions();
    },
    [isPaused, gameOver, width, height, birdsSpeed, cloudsSpeed, fuel]
  );
  return { gameItemsRef, updateGame };
}

export default useGameItems;
