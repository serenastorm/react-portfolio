import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";

import "./SectionWithHeader.scss";

type SectionWithHeaderProps = {
  title: string;
  children?: ReactNode;
  className?: string;
};

const SectionWithHeader = ({
  title,
  children,
  className,
}: SectionWithHeaderProps) => {
  return (
    <motion.section
      className={`section-hasHeader${className ? ` section-${className}` : ""}`}
      {...scrollAnimationWrapperProps}
    >
      <motion.h1 variants={scrollAnimationVariants({})}>{title}</motion.h1>
      {children}
    </motion.section>
  );
};

export default SectionWithHeader;
