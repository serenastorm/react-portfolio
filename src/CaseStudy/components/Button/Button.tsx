import { MouseEventHandler, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  scrollAnimationVariants,
  ScrollAnimationProps,
} from "helpers/animations";

import "./Button.scss";

interface ButtonProps {
  animationProps?: ScrollAnimationProps;
  block?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "dark";
}

const Button = ({
  animationProps,
  block,
  className = "",
  children,
  onClick,
  variant = "dark",
}: ButtonProps) => {
  const buttonProps = {
    className: `button ${`button-${variant}`}${
      block ? " button-block" : ""
    } ${className}`,
    onClick,
  };

  return animationProps ? (
    <motion.button
      {...buttonProps}
      type="button"
      variants={scrollAnimationVariants(animationProps)}
    >
      {children}
    </motion.button>
  ) : (
    <button {...buttonProps} type="button">
      {children}
    </button>
  );
};

export default Button;
