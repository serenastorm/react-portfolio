import { ReactNode } from "react";
import { motion } from "framer-motion";
import { scrollAnimationWrapperProps } from "helpers/animations";

import "./FullScreenText.scss";

type FullScreenTextProps = {
  children: ReactNode;
  isFooter?: boolean;
};

const FullScreenText = ({ children, isFooter }: FullScreenTextProps) => {
  const className = "text-isFullScreen";
  const props = { className, ...scrollAnimationWrapperProps };

  return isFooter ? (
    <motion.footer {...props}>{children}</motion.footer>
  ) : (
    <motion.div {...props}>{children}</motion.div>
  );
};

export default FullScreenText;
