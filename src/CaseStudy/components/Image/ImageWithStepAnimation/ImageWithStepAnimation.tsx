// A wrapper for animations that are made of multiple images/components

import { useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { useStepsAnimation } from "infrastructure/hooks";
import { enterAndExitAnimationProps } from "helpers/animations";
import { ImageAnimationProps } from "../types";

type AnimationDirection = "none" | "left" | "right";

interface ImageWithStepAnimationProps extends ImageAnimationProps {
  animationDirection?: AnimationDirection;
  // Pass down the animation props to child components
  children: (
    animationStep: number,
    setAnimationStep: Dispatch<SetStateAction<number>>,
    pauseOnUserInteraction: (interval: number) => void
  ) => ReactNode;
  className?: string;
}

const ImageWithStepAnimation = ({
  animationDirection = "none",
  animationStages,
  animationClassName,
  children,
  className = "",
  totalSteps,
  intervalInMs = 300,
}: ImageWithStepAnimationProps) => {
  const {
    animationStep,
    setAnimationStep,
    startStepAnimation,
    pauseStepAnimation,
    pauseOnUserInteraction,
  } = useStepsAnimation({
    totalSteps:
      animationStages && animationStages.length > 0
        ? animationStages.length
        : totalSteps,
    intervalInMs,
  });

  const shouldAnimate = animationDirection !== "none";
  const wrapperClassName = `${className} img-hasStepAnimation img-hasStepAnimation-step${
    animationStep + 1
  }${` img-${animationClassName}${
    animationStages
      ? ` img-${animationClassName}-${animationStages[animationStep]}`
      : ""
  }`}`;
  const wrapperProps = { className: wrapperClassName };

  useEffect(() => {
    startStepAnimation();
    return () => pauseStepAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {children(animationStep, setAnimationStep, pauseOnUserInteraction)}
    </motion.div>
  ) : (
    <div {...wrapperProps}>
      {children(animationStep, setAnimationStep, pauseOnUserInteraction)}
    </div>
  );
};

export default ImageWithStepAnimation;
