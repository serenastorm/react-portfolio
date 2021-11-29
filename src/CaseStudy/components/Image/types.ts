export type ImageAnimationProps = {
  animationStages?: string[];
  animationClassName: string;
  totalSteps: number;
  intervalInMs?: number;
};

export type ImageContainerProps = {
  bg?: "Dark" | "Light" | "LightGray" | "None";
  imageClassName: string;
  helpToggleTipCopy?: string;
};
