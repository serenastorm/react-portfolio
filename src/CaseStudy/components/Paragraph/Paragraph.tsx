import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";

import "./Paragraph.scss";

type ParagraphProps = {
  children: ReactNode;
  header?: string;
};

const Paragraph = ({ children, header }: ParagraphProps) => {
  return (
    <motion.section {...scrollAnimationWrapperProps} className="paragraph">
      {header && (
        <motion.h2 variants={scrollAnimationVariants({})}>{header}</motion.h2>
      )}
      <motion.p variants={scrollAnimationVariants({ delay: header ? 0.25 : 0 })}>
        {children}
      </motion.p>
    </motion.section>
  );
};

export default Paragraph;
