import { Variants } from "framer-motion";

type OpacityProps = number;
type PositionProps = number | string;

export type ScrollAnimationProps = {
  delay?: number;
  duration?: number;
};

interface EnterAndExitAnimation extends ScrollAnimationProps {
  opacity?: [OpacityProps, OpacityProps];
  enterTransition?: ScrollAnimationProps;
  exitTransition?: ScrollAnimationProps;
  y?: [PositionProps, PositionProps, PositionProps];
  x?: [PositionProps, PositionProps, PositionProps];
}

const mediaQuery = "(prefers-reduced-motion: reduce)";
const userPrefersReducedMotion = window.matchMedia(mediaQuery).matches;

export const enterAndExitAnimationProps = ({
  delay = 0,
  duration = 1,
  opacity = [1, 1],
  enterTransition,
  exitTransition,
  y = [0, 0, 0],
  x = [0, 0, 0],
}: EnterAndExitAnimation) => {
  const [opacityValue1, opacityValue2] = opacity;
  const [yPositionInitial, yPositionDefault, yPositionExit] = y;
  const [xPositionInitial, xPositionDefault, xPositionExit] = x;

  const getOpacityValue = (value: OpacityProps) =>
    userPrefersReducedMotion ? 1 : value;
  const getPositionValue = (value: PositionProps) =>
    userPrefersReducedMotion ? 0 : value;
  const getTransitionValue = (value?: ScrollAnimationProps) =>
    userPrefersReducedMotion || !value ? undefined : value;
  const getTransitionPropValue = (value: ScrollAnimationProps) => {
    if (enterTransition || exitTransition) {
      return undefined;
    } else {
      return userPrefersReducedMotion ? { delay: 0, duration: 0 } : value;
    }
  };

  return {
    initial: {
      opacity: getOpacityValue(opacityValue1),
      y: getPositionValue(yPositionInitial),
      x: getPositionValue(xPositionInitial),
    },
    animate: {
      opacity: getOpacityValue(opacityValue2),
      y: getPositionValue(yPositionDefault),
      x: getPositionValue(xPositionDefault),
      transition: getTransitionValue(enterTransition),
    },
    exit: {
      opacity: getOpacityValue(opacityValue1),
      y: getPositionValue(yPositionExit),
      x: getPositionValue(xPositionExit),
      transition: getTransitionValue(exitTransition),
    },
    transition: getTransitionPropValue({ delay, duration }),
  };
};

export const scrollAnimationVariants = ({
  delay = 0,
  duration = 1,
}: ScrollAnimationProps): Variants => {
  return {
    offscreen: {
      opacity: userPrefersReducedMotion ? 1 : 0,
      y: userPrefersReducedMotion ? 0 : 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: userPrefersReducedMotion ? 0 : duration,
        delay: userPrefersReducedMotion ? 0 : delay,
      },
    },
  };
};

export const scrollAnimation = {
  offscreen: "offscreen",
  onscreen: "onscreen",
};

export const scrollAnimationWrapperProps = {
  initial: scrollAnimation.offscreen,
  whileInView: scrollAnimation.onscreen,
  viewport: { once: true },
};
