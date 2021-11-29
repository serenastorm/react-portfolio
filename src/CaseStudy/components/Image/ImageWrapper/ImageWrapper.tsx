import { ReactNode } from "react";
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
  const wrapperClassName = `imgWrapper ${className}`;
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

export default ImageWrapper;
