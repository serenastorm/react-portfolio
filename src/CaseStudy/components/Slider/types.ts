import { ReactNode, MutableRefObject } from "react";

type SlideVisual = (() => ReactNode) | ReactNode | JSX.Element;
export type SlideCopy = string | string[];

export type SlideProps = { el: SlideVisual; copy?: SlideCopy };

export type ScrollRefProps = HTMLDivElement | HTMLLIElement | null;

export type ScrollContainerRefProps = MutableRefObject<ScrollRefProps>;
