import { MutableRefObject, ReactNode, Ref } from "react";
import { motion } from "framer-motion";
import { ToggleTip } from "CaseStudy/components";
import { scrollAnimationWrapperProps } from "helpers/animations";
import { ImageContainerProps } from "../types";

import "./FullScreenImageContainer.scss";

interface FullScreenImageContainerProps extends ImageContainerProps {
  className?: string;
  children: ReactNode;
  containerRef?: Ref<HTMLElement>;
  currentSlideIndex?: number;
  fullScreenSlides?: boolean;
}

const FullScreenImageContainer = ({
  bg,
  className = "",
  children,
  containerRef,
  currentSlideIndex = -1,
  fullScreenSlides,
  imageClassName,
  helpToggleTipCopy,
}: FullScreenImageContainerProps) => {
  const isSlider = currentSlideIndex > -1;

  return (
    <motion.figure
      className={`imgContainer-isFullScreen${
        isSlider
          ? ` imgContainer-isSlider imgContainer-isSlider-slide${
              currentSlideIndex + 1
            }${fullScreenSlides ? " imgContainer-isSlider-isFullScreen" : ""}`
          : ""
      }${
        bg ? ` imgContainer-bg${bg}` : ""
      } imgContainer-${imageClassName} ${className}`}
      ref={containerRef}
      {...scrollAnimationWrapperProps}
    >
      {helpToggleTipCopy && (
        <ToggleTip content={helpToggleTipCopy} label="Help" />
      )}
      {children}
    </motion.figure>
  );
};

export default FullScreenImageContainer;
