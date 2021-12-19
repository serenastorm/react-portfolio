import { createElement, ReactNode } from "react";
import { motion, HTMLMotionProps, ForwardRefComponent } from "framer-motion";
import { scrollAnimationWrapperProps } from "helpers/animations";

import "./FullScreenText.scss";

type FullScreenTextContainerProps = "div" | "footer";

type FullScreenTextProps = {
  as?: FullScreenTextContainerProps;
  children: ReactNode;
};

const FullScreenText = ({ as = "div", children }: FullScreenTextProps) => {
  return createElement(
    motion[`${as}`] as ForwardRefComponent<
      HTMLElement,
      HTMLMotionProps<FullScreenTextContainerProps>
    >,
    {
      className: "text-isFullScreen",
      ...scrollAnimationWrapperProps,
    },
    children
  );
};

export default FullScreenText;
