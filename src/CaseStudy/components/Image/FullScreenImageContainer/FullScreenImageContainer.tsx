import { ReactNode, Ref, MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { ToggleTip } from "CaseStudy/components";
import { scrollAnimationWrapperProps } from "helpers/animations";
import { ImageContainerProps } from "../types";
import { DragContainerProps } from "CaseStudy/components/Slider/types";

import "./FullScreenImageContainer.scss";

interface FullScreenImageContainerProps extends ImageContainerProps {
  className?: string;
  children: ReactNode;
  containerRef?: Ref<HTMLElement>;
  currentSlideIndex?: number;
  dragContainerProps?: DragContainerProps;
  fullScreenSlides?: boolean;
}

const FullScreenImageContainer = ({
  bg,
  className = "",
  children,
  containerRef,
  currentSlideIndex = -1,
  dragContainerProps,
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
      } imgContainer-${imageClassName} ${className}`}
      ref={containerRef}
      data-bg={bg ? bg.toLowerCase() : ""}
      {...scrollAnimationWrapperProps}
      {...dragContainerProps}
    >
      {helpToggleTipCopy && (
        <ToggleTip content={helpToggleTipCopy} label="Help" />
      )}
      {children}
    </motion.figure>
  );
};

export default FullScreenImageContainer;
