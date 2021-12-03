import { useState, useEffect } from "react";

interface WindowDimensionsProps {
  windowWidth: number;
  windowHeight: number;
}

const getWindowDimensions = () => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight,
  };
};

const useWindowDimensions = (): WindowDimensionsProps => {
  const [windowDimensions, setWindowDimensions] =
    useState<WindowDimensionsProps>(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
