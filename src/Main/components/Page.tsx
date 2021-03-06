import { createElement, ReactNode } from "react";
import { motion, HTMLMotionProps, ForwardRefComponent } from "framer-motion";
import { scrollAnimationWrapperProps } from "helpers/animations";
import { NavButton } from ".";

type PageContainerType = "div" | "article";

type PageProps = {
  as?: PageContainerType;
  children: ReactNode;
  className?: string;
};

const Page = ({ as = "div", children, className = "" }: PageProps) => {
  return createElement(
    motion[`${as}`] as ForwardRefComponent<
      HTMLElement,
      HTMLMotionProps<PageContainerType>
    >,
    {
      ...scrollAnimationWrapperProps,
      className,
    },
    <>
      <NavButton />
      {children}
    </>
  );
};

export default Page;
