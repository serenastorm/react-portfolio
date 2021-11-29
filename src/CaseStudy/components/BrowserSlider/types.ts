import { ImageAnimationProps } from "CaseStudy/components/Image/types";

export type SlideImageProps = {
  img: string | string[];
  alt: string;
  slides: number | number[];
  className?: string;
  animation: "fade" | "modal";
  animationProps?: ImageAnimationProps;
};
