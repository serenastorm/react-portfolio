import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
  TouchEvent,
} from "react";
import {
  DragContainerWithDirectionProps,
  TouchDirection,
} from "CaseStudy/components/Slider/types";

type SliderDirection = "left" | "right";

type SliderProps = {
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
  sliderDirection: SliderDirection;
  scrollContainerRef: MutableRefObject<HTMLElement | null>;
  dragContainerProps: DragContainerWithDirectionProps;
};

const useSlider = (totalSlides: number): SliderProps => {
  const [mousePosition, setMousePosition] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [percentageOfContainerInView, setPercentageOfContainerInView] =
    useState<number>(0);
  const [sliderDirection, setSliderDirection] =
    useState<SliderDirection>("right");

  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const slides = totalSlides || 0;

  const scrollToTopOfContainer = useCallback(() => {
    const mediaQuery = "(prefers-reduced-motion: reduce)";
    const userPrefersReducedMotion = window.matchMedia(mediaQuery).matches;

    // If 40% of the container is visible, don't scroll to top
    if (scrollContainerRef.current && percentageOfContainerInView < 60) {
      scrollContainerRef.current.scrollIntoView({
        behavior: userPrefersReducedMotion ? undefined : "smooth",
      });
    }
  }, [scrollContainerRef, percentageOfContainerInView]);

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

  const dragContainerProps = (touchDirection: TouchDirection = "left") => {
    return {
      onTouchStart: (event: TouchEvent<HTMLElement>) => {
        const startPosition =
          touchDirection === "left"
            ? event.touches[0].pageX
            : event.touches[0].pageY;
        setMousePosition(startPosition);
      },
      onTouchEnd: (event: TouchEvent<HTMLElement>) => {
        const { innerWidth } = window;
        const endPosition =
          touchDirection === "left"
            ? event.changedTouches[0].pageX
            : event.changedTouches[0].pageY;

        if (endPosition > mousePosition) {
          const swipePercentage =
            ((endPosition - mousePosition) / innerWidth) * 100;

          setMousePosition(endPosition);

          // Only switch slides if the user dragged more than 20% of the screen
          if (swipePercentage > 20) {
            goToPreviousSlide();
          }
        } else if (mousePosition > endPosition) {
          const swipePercentage =
            ((mousePosition - endPosition) / innerWidth) * 100;

          setMousePosition(endPosition);

          // Only switch slides if the user dragged more than 20% of the screen
          if (swipePercentage > 20) {
            goToNextSlide();
          }
        }
      },
    };
  };

  useEffect(() => {
    const checkIfContainerIsInView = () => {
      const { pageYOffset, innerHeight } = window;

      if (scrollContainerRef.current) {
        const containerBoundingValues =
          scrollContainerRef.current.getBoundingClientRect();

        const containerTop = containerBoundingValues.top + pageYOffset;
        const containerHeight = containerBoundingValues.height;
        const containerBottom = containerTop + containerHeight;

        const windowTop = pageYOffset;
        const windowBottom = pageYOffset + innerHeight;

        const isFullyInView =
          windowTop < containerTop && windowBottom > containerBottom;
        const heightInViewInTopOfScreen = windowBottom - containerTop;
        const heightInViewInBottomOfScreen = containerBottom - windowTop;
        const containerHeightInTopOfScreen =
          heightInViewInBottomOfScreen > 0 &&
          heightInViewInBottomOfScreen < containerHeight
            ? heightInViewInBottomOfScreen
            : 0;
        const containerHeightInBottomOfScreen =
          heightInViewInTopOfScreen > 0 &&
          heightInViewInTopOfScreen < containerHeight
            ? heightInViewInTopOfScreen
            : 0;

        const heightInView = isFullyInView
          ? containerHeight
          : Math.max(
              containerHeightInTopOfScreen,
              containerHeightInBottomOfScreen
            );

        const visiblePercentageOfContainer =
          (heightInView / containerHeight) * 100;

        setPercentageOfContainerInView(visiblePercentageOfContainer);
      }
    };

    checkIfContainerIsInView();

    window.addEventListener("scroll", checkIfContainerIsInView);
    return () => window.removeEventListener("scroll", checkIfContainerIsInView);
  }, [scrollContainerRef]);

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
