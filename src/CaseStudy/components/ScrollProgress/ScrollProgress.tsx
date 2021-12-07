import { useState, useEffect } from "react";

import "./ScrollProgress.scss";

type ScrollProgressProps = {
  shape?: "bar" | "circle";
  onScrollComplete?: () => void;
};

const ScrollProgress = ({
  shape = "bar",
  onScrollComplete,
}: ScrollProgressProps) => {
  const [scrollYPercentage, setScrollYPercentage] = useState<number>(0);
  const radius = 16;
  const stroke = 2;
  const progress = scrollYPercentage;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getScrollPosition = () => {
    const { pageYOffset, innerHeight } = window;
    const { scrollHeight } = document.body;
    // The bottom should be reached when the footer is in view (footer is 100vh)
    const footerHeight = innerHeight * 1.8;
    const scrollPositionInPercentage =
      (pageYOffset / (scrollHeight - footerHeight)) * 100;
    return scrollPositionInPercentage >= 100 ? 100 : scrollPositionInPercentage;
  };

  useEffect(() => {
    const updatePosition = () => {
      setScrollYPercentage(getScrollPosition());
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  useEffect(() => {
    if (scrollYPercentage >= 100 && onScrollComplete) {
      onScrollComplete();
    }
  }, [scrollYPercentage, onScrollComplete]);

  const progressCircleProps = {
    strokeWidth: stroke,
    // ["stroke-width"]: stroke,
    style: { strokeDashoffset },
    r: normalizedRadius,
    cx: radius,
    cy: radius,
  };

  const progressCopy = `You have read ${Math.round(
    scrollYPercentage
  )}% of this section.`;

  return (
    <>
      <div
        role="progressbar"
        className="screenReaderText"
        aria-valuenow={Math.round(scrollYPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={progressCopy}
        title={progressCopy}
      />

      {shape === "bar" ? (
        <div className="progressIndicator-container">
          <div
            className="progressBar-track"
            style={{ width: `${scrollYPercentage}%` }}
          ></div>
        </div>
      ) : (
        <div
          className="progressIndicator"
          data-complete={progress >= 100 ? "true" : "false"}
        >
          <svg height={radius * 2} width={radius * 2}>
            <circle
              className="progressIndicator-track"
              fill="transparent"
              {...progressCircleProps}
            />
            <circle
              className="progressIndicator-thumb"
              fill="transparent"
              strokeDasharray={circumference + " " + circumference}
              {...progressCircleProps}
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default ScrollProgress;
