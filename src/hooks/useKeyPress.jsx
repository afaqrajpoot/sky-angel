import { useRef, useEffect } from "react";

export const useKeyPress = (handlePauseState) => {
  const pressedKeys = useRef({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
      }

      pressedKeys.current[event.key] = true;

      if (event.key === " ") {
        handlePauseState();
      }
    };

    const handleKeyUp = (event) => {
      pressedKeys.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handlePauseState]);

  return pressedKeys;
};
