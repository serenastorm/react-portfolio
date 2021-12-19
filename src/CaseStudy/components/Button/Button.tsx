import { createElement, MouseEventHandler, ReactNode } from "react";
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

  const animatedButtonProps = animationProps
    ? { variants: scrollAnimationVariants(animationProps) }
    : {};

  return createElement(
    animationProps ? motion.button : "button",
    {
      ...animatedButtonProps,
      ...buttonProps,
      type: "button",
    },
    children
  );
};

export default Button;
