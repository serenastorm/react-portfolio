// A carousel for demoing various features and interactions
// https://www.w3.org/WAI/tutorials/carousels/functionality/

import { Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import { FullScreenImageContainer } from "CaseStudy/components/Image";
import { ImageContainerProps } from "CaseStudy/components/Image/types";
import { SliderDirectionContextProvider } from "infrastructure/contexts";
import { SlideProps } from "CaseStudy/components/Slider/types";
import { Slider } from "CaseStudy/components";
import { useSlider } from "infrastructure/hooks";

import "CaseStudy/components/Slider/Slider.scss";

interface DemoSliderProps extends ImageContainerProps {
  slides: SlideProps[];
  label: string;
}

const DemoSlider = ({
  slides,
  label,
  ...imageContainerProps
}: DemoSliderProps) => {
  const totalSlides = slides.length;
  const {
    currentSlideIndex,
    onNextButtonClick,
    onPreviousButtonClick,
    sliderDirection,
    scrollContainerRef,
  } = useSlider(totalSlides);

  return (
    <SliderDirectionContextProvider value={sliderDirection}>
      <FullScreenImageContainer
        currentSlideIndex={currentSlideIndex}
        fullScreenSlides
        helpToggleTipCopy="Use the next and previous arrows to navigate the carousel."
        containerRef={scrollContainerRef}
        {...imageContainerProps}
      >
        <section className="imgSlider" aria-labelledby="carouselHeading">
          <h3 id="carouselHeading" className="screenReaderText">
            {label}
          </h3>

          <Slider.Button
            direction="Prev"
            onClick={() => onPreviousButtonClick()}
          />
          <ul>
            <AnimatePresence exitBeforeEnter>
              {slides.map((slide, i) => {
                const { el, copy } = slide;

                return currentSlideIndex === i ? (
                  <Slider.Slide
                    asList
                    sectionIndex={i}
                    key={`${imageContainerProps.imageClassName}-slide-${i}`}
                  >
                    <Fragment
                      key={`${imageContainerProps.imageClassName}-visual-${i}`}
                    >
                      {el}
                    </Fragment>
                    {copy && (
                      <figcaption>
                        <Slider.Caption
                          key={`${imageContainerProps.imageClassName}-caption-${i}`}
                          copy={copy}
                        />
                      </figcaption>
                    )}
                  </Slider.Slide>
                ) : null;
              })}
            </AnimatePresence>
          </ul>
          <Slider.Button direction="Next" onClick={() => onNextButtonClick()} />
          <div
            aria-live="polite"
            aria-atomic="true"
            className="screenReaderText"
          >
            Item {currentSlideIndex} of {totalSlides}
          </div>
        </section>
      </FullScreenImageContainer>
    </SliderDirectionContextProvider>
  );
};

export default DemoSlider;
