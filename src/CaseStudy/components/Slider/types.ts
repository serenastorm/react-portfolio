import {
  ReactNode,
  MutableRefObject,
  MouseEventHandler,
  TouchEventHandler,
} from "react";

type SlideVisual = (() => ReactNode) | ReactNode | JSX.Element;
export type SlideCopy = string | string[];

export type SlideProps = { el: SlideVisual; copy?: SlideCopy };

export type ScrollRefProps = HTMLDivElement | HTMLLIElement | null;

export type ScrollContainerRefProps = MutableRefObject<ScrollRefProps>;

export type DragContainerProps = {
  onTouchStart: TouchEventHandler<HTMLElement>;
  onTouchEnd: TouchEventHandler<HTMLElement>;
};

export type ImageContainerProps = {
  bg?: "Dark" | "Light" | "LightGray" | "None";
  imageClassName: string;
  helpToggleTipCopy?: string;
};
