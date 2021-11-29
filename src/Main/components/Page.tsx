import { ReactNode } from "react";
import { motion } from "framer-motion";
import { scrollAnimationWrapperProps } from "helpers/animations";

type PageProps = {
  children: ReactNode;
  className?: string;
};

const Page = ({ children, className = "" }: PageProps) => {
  return (
    <motion.div className={className} {...scrollAnimationWrapperProps}>
      {children}
    </motion.div>
  );
};

export default Page;
