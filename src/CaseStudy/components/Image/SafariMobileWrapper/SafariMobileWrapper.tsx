// A wrapper for mobile browser screenshots

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  enterAndExitAnimationProps,
  scrollAnimationVariants,
} from "helpers/animations";

import "./SafariMobileWrapper.scss";

type AnimationDirection = "none" | "left" | "right";

type SafariMobileWrapperProps = {
  animationDirection?: AnimationDirection;
  className?: string;
  children: ReactNode;
};

const SafariMobileWrapper = ({
  animationDirection = "none",
  className = "",
  children,
}: SafariMobileWrapperProps) => {
  const animationProps =
    animationDirection === "none"
      ? { variants: scrollAnimationVariants({}) }
      : enterAndExitAnimationProps({
          opacity: [0, 1],
          x: [
            `${animationDirection === "left" ? "-" : ""}10%`,
            0,
            `${animationDirection === "left" ? "" : "-"}10%`,
          ],
        });

  return (
    <motion.div
      className={`mobileMock-wrapper ${className}`}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
};

export default SafariMobileWrapper;
