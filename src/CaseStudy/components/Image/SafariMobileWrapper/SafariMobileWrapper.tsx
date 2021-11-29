// A wrapper for browser screenshots that has the Safari browser bar at the top

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { enterAndExitAnimationProps } from "helpers/animations";

import "./SafariMobileWrapper.scss";

type AnimationDirection = "none" | "left" | "right";

type SafariMobileWrapperProps = {
  animationDirection?: AnimationDirection;
  className?: string;
  children: ReactNode;
  overlay?: boolean;
};

const SafariMobileWrapper = ({
  animationDirection = "none",
  className = "",
  children,
  overlay,
}: SafariMobileWrapperProps) => {
  const shouldAnimate = animationDirection !== "none";
  const wrapperClassName = `mobileMock-wrapper ${className}`;
  const wrapperProps = { className: wrapperClassName };

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
      {children}
    </motion.div>
  ) : (
    <div {...wrapperProps}>{children}</div>
  );
};

export default SafariMobileWrapper;
