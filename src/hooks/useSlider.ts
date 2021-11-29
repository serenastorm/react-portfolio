import { useState, Dispatch, SetStateAction } from "react";

type SliderDirection = "left" | "right";

type SliderProps = {
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
  sliderDirection: SliderDirection;
};

const useSlider = (totalSlides: number): SliderProps => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [sliderDirection, setSliderDirection] =
    useState<SliderDirection>("right");

  const slides = totalSlides || 0;

  const onPreviousButtonClick = () => {
    setCurrentSlideIndex((currentSlide) =>
      currentSlide <= 0 ? slides - 1 : currentSlide - 1
    );
    setSliderDirection("left");
  };

  const onNextButtonClick = () => {
    setCurrentSlideIndex((currentSlide) =>
      currentSlide >= slides - 1 ? 0 : currentSlide + 1
    );
    setSliderDirection("right");
  };

  return {
    currentSlideIndex,
    setCurrentSlideIndex,
    onNextButtonClick,
    onPreviousButtonClick,
    sliderDirection,
  };
};

export default useSlider;
