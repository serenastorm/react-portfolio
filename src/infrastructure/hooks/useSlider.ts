import {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
  TouchEvent,
  MouseEvent,
} from "react";
import { DragContainerProps } from "CaseStudy/components/Slider/types";

type SliderDirection = "left" | "right";

type SliderProps = {
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
  sliderDirection: SliderDirection;
  scrollContainerRef: MutableRefObject<HTMLElement | null>;
  dragContainerProps: DragContainerProps;
};

const useSlider = (totalSlides: number): SliderProps => {
  const [mousePosition, setMousePosition] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [sliderDirection, setSliderDirection] =
    useState<SliderDirection>("right");

  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const slides = totalSlides || 0;

  const scrollToTopOfContainer = () => {
    const mediaQuery = "(prefers-reduced-motion: reduce)";
    const userPrefersReducedMotion = window.matchMedia(mediaQuery).matches;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({
        behavior: userPrefersReducedMotion ? undefined : "smooth",
      });
    }
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((currentSlide) =>
      currentSlide <= 0 ? slides - 1 : currentSlide - 1
    );
    setSliderDirection("left");
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((currentSlide) =>
      currentSlide >= slides - 1 ? 0 : currentSlide + 1
    );
    setSliderDirection("right");
  };

  const onPreviousButtonClick = () => {
    goToPreviousSlide();
    scrollToTopOfContainer();
  };

  const onNextButtonClick = () => {
    goToNextSlide();
    scrollToTopOfContainer();
  };

  const dragContainerProps = {
    onTouchStart: (event: TouchEvent<HTMLElement>) => {
      const startPosition = event.touches[0].pageX;
      setMousePosition(startPosition);
    },
    onTouchEnd: (event: TouchEvent<HTMLElement>) => {
      const endPosition = event.changedTouches[0].pageX;

      if (endPosition > mousePosition) {
        goToPreviousSlide();
        setMousePosition(endPosition);
      } else if (mousePosition > endPosition) {
        setMousePosition(endPosition);
        goToNextSlide();
      }
    },
  };

  return {
    currentSlideIndex,
    setCurrentSlideIndex,
    onNextButtonClick,
    onPreviousButtonClick,
    sliderDirection,
    scrollContainerRef,
    dragContainerProps,
  };
};

export default useSlider;
