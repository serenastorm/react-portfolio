import { ReactNode } from "react";
import { motion } from "framer-motion";
import { scrollAnimationWrapperProps } from "helpers/animations";
import { NavButton } from ".";

type PageProps = {
  children: ReactNode;
  className?: string;
};

const Page = ({ children, className = "" }: PageProps) => {
  return (
    <motion.div className={className} {...scrollAnimationWrapperProps}>
      <NavButton />
      {children}
    </motion.div>
  );
};

export default Page;
