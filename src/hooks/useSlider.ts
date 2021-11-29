import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
} from "react";

type SliderDirection = "left" | "right";

type SliderProps = {
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
  sliderDirection: SliderDirection;
  scrollContainerRef: MutableRefObject<HTMLElement | null>;
};

const useSlider = (totalSlides: number): SliderProps => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [sliderDirection, setSliderDirection] =
    useState<SliderDirection>("right");

  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const slides = totalSlides || 0;

  const scrollToTopOfContainer = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // const scrollToTopOfContainer = useCallback(() => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollIntoView();
  //   }
  // }, [scrollContainerRef]);

  const onPreviousButtonClick = () => {
    setCurrentSlideIndex((currentSlide) =>
      currentSlide <= 0 ? slides - 1 : currentSlide - 1
    );
    setSliderDirection("left");
    scrollToTopOfContainer();
  };

  const onNextButtonClick = () => {
    setCurrentSlideIndex((currentSlide) =>
      currentSlide >= slides - 1 ? 0 : currentSlide + 1
    );
    setSliderDirection("right");
    scrollToTopOfContainer();
  };

  return {
    currentSlideIndex,
    setCurrentSlideIndex,
    onNextButtonClick,
    onPreviousButtonClick,
    sliderDirection,
    scrollContainerRef,
  };
};

export default useSlider;
