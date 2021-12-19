import { createElement, ReactNode } from "react";
import { motion } from "framer-motion";
import { enterAndExitAnimationProps } from "helpers/animations";

type AnimationDirection = "none" | "left" | "right";

type ImageWrapperProps = {
  animationDirection?: AnimationDirection;
  children: ReactNode;
  className?: string;
};

const ImageWrapper = ({
  animationDirection = "none",
  children,
  className = "",
}: ImageWrapperProps) => {
  const shouldAnimate = animationDirection !== "none";
  const animationProps = shouldAnimate
    ? enterAndExitAnimationProps({
        opacity: [0, 1],
        x: [
          `${animationDirection === "left" ? "-" : ""}10%`,
          0,
          `${animationDirection === "left" ? "" : "-"}10%`,
        ],
      })
    : {};

  return createElement(
    shouldAnimate ? motion.div : "div",
    {
      className: `imgWrapper ${className}`,
      ...animationProps,
    },
    children
  );
};

export default ImageWrapper;
