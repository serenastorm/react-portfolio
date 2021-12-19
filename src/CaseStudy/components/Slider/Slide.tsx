import { createElement, ReactNode } from "react";

type SlideProps = {
  as?: "li" | "div";
  children: ReactNode;
  sectionIndex: number;
};

const Slide = ({ as = "div", children, sectionIndex }: SlideProps) => {
  return createElement(
    as,
    {
      className: `slide slide${sectionIndex + 1}`,
    },
    children
  );
};

export default Slide;
