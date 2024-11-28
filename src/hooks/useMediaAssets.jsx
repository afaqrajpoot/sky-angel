import { useRef, useEffect } from "react";

export const useMediaAssets = (imageUrls, isGameStarted, startGameLoop, stopGameLoop) => {
  const imagesRef = useRef({});

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = {};
      for (const [key, url] of Object.entries(imageUrls)) {
        const img = new Image();
        img.src = url;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        loadedImages[key] = img;
      }
      imagesRef.current = loadedImages;

    //   if (isGameStarted) startGameLoop();
    };

    loadImages();
    return stopGameLoop;
  }, [imageUrls, isGameStarted, startGameLoop, stopGameLoop]);

  return imagesRef;
};
