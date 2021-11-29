// A wrapper for browser screenshots that has the Safari browser bar at the top

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { DesktopMocksImages } from "CaseStudy/assets/Mocks/Browser";
import {
  enterAndExitAnimationProps,
  scrollAnimationVariants,
} from "helpers/animations";

import "./SafariDesktopWrapper.scss";

type AnimationDirection = "none" | "left" | "right";

type SafariDesktopWrapperProps = {
  animationDirection?: AnimationDirection;
  className?: string;
  children: ReactNode;
  overlay?: boolean;
};

const SafariDesktopWrapper = ({
  animationDirection = "none",
  className = "",
  children,
  overlay,
}: SafariDesktopWrapperProps) => {
  const shouldAnimate = animationDirection !== "none";
  const wrapperClassName = `desktopMock-wrapper ${className}`;
  const wrapperProps = {
    className: wrapperClassName,
  };

  const renderScreen = () => (
    <>
      <img
        src={DesktopMocksImages.BrowserBar}
        alt=""
        className="desktopMock-browserBar"
      />
      <div
        className={`desktopMock-screen${
          overlay ? " desktopMock-screen-hasOverlay" : ""
        }`}
      >
        {children}
      </div>
    </>
  );

  return shouldAnimate ? (
    <motion.div
      {...wrapperProps}
      {...enterAndExitAnimationProps({
        opacity: [0, 1],
        x: [
          `${animationDirection === "left" ? "-" : ""}10%`,
          0,
          `${animationDirection === "left" ? "" : "-"}10%`,
        ],
      })}
    >
      {renderScreen()}
    </motion.div>
  ) : (
    <motion.div {...wrapperProps} variants={scrollAnimationVariants({})}>
      {renderScreen()}
    </motion.div>
  );
};

export default SafariDesktopWrapper;
