import { ReactNode } from "react";

type SlideProps = {
  asList?: boolean;
  children: ReactNode;
  sectionIndex: number;
};

const Slide = ({ asList, children, sectionIndex }: SlideProps) => {
  const wrapperClassName = `slide slide${sectionIndex + 1}`;
  const wrapperProps = {
    className: wrapperClassName,
  };

  return asList ? (
    <li {...wrapperProps}>{children}</li>
  ) : (
    <div {...wrapperProps}>{children}</div>
  );
};

export default Slide;
