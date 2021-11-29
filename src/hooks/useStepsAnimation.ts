import { useCallback, useState, useRef, Dispatch, SetStateAction } from "react";

type AnimationProps = {
  totalSteps: number;
  intervalInMs?: number;
};

type StepsAnimationProps = {
  animationStep: number;
  setAnimationStep: Dispatch<SetStateAction<number>>;
  startStepAnimation: () => void;
  pauseStepAnimation: () => void;
  pauseOnUserInteraction: (interval: number) => void;
};

const useStepsAnimation = ({
  totalSteps,
  intervalInMs = 300,
}: AnimationProps): StepsAnimationProps => {
  const [isIntervalPaused, setIsIntervalPaused] = useState<boolean>(false);
  const [animationStep, setAnimationStep] = useState<number>(0);
  const animationInterval = useRef<NodeJS.Timeout | null>(null);

  const startStepAnimation = useCallback(() => {
    animationInterval.current = setInterval(() => {
      setAnimationStep((currentStep) =>
        currentStep >= totalSteps - 1 ? 0 : currentStep + 1
      );
    }, intervalInMs);
  }, [intervalInMs, totalSteps]);

  const pauseStepAnimation = () => {
    if (animationInterval?.current) {
      clearInterval(animationInterval.current);
    }
  };

  const pauseOnUserInteraction = (interval: number) => {
    if (!isIntervalPaused) {
      pauseStepAnimation();
      setIsIntervalPaused(true);

      setTimeout(() => {
        startStepAnimation();
        setIsIntervalPaused(false);
      }, interval);
    }
  };

  return {
    animationStep,
    setAnimationStep,
    startStepAnimation,
    pauseStepAnimation,
    pauseOnUserInteraction,
  };
};

export default useStepsAnimation;
