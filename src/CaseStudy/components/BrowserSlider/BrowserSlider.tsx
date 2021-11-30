// A carousel that displays desktop screens inside a Safari browser mock up
// https://www.w3.org/WAI/tutorials/carousels/functionality/

import { AnimatePresence, motion } from "framer-motion";
import {
  ImageWithStepAnimation,
  FullScreenImageContainer,
  SafariDesktopWrapper,
} from "CaseStudy/components/Image";
import { ImageContainerProps } from "CaseStudy/components/Image/types";
import { SliderDirectionContextProvider } from "infrastructure/contexts";
import { SlideCopy } from "CaseStudy/components/Slider/types";
import { Slider } from "CaseStudy/components";
import { useSlider } from "infrastructure/hooks";
import { SlideImageProps } from "./types";

import "CaseStudy/components/Slider/Slider.scss";

interface BrowserSliderProps extends ImageContainerProps {
  captions?: SlideCopy[] | string;
  slideIndicesWithOverlay?: number[] | number;
  screens: SlideImageProps[];
  label: string;
}

const BrowserSlider = ({
  captions,
  slideIndicesWithOverlay,
  screens,
  label,
  ...imageContainerProps
}: BrowserSliderProps) => {
  const totalSlides = screens.length;
  const {
    currentSlideIndex,
    onNextButtonClick,
    onPreviousButtonClick,
    sliderDirection,
    scrollContainerRef,
  } = useSlider(totalSlides);

  // Show a dark overlay over the screen (for example, to showcase a modal)
  const slideShouldHaveOverlay = Array.isArray(slideIndicesWithOverlay)
    ? slideIndicesWithOverlay.includes(currentSlideIndex)
    : slideIndicesWithOverlay === currentSlideIndex;

  const renderCaptions = () => {
    if (!captions) {
      return null;
    } else if (typeof captions === "string") {
      return (
        <figcaption>
          <Slider.Caption copy={captions} animated={false} />
        </figcaption>
      );
    } else {
      const captionsToRender = captions?.filter(
        (caption, captionIndex) => captionIndex === currentSlideIndex
      );
      return (
        <AnimatePresence exitBeforeEnter>
          {typeof captionsToRender === "string" && (
            <figcaption>
              <Slider.Caption copy={captionsToRender} />
            </figcaption>
          )}
          {Array.isArray(captionsToRender) && (
            <figcaption>
              {captionsToRender.map(
                (caption: string[] | string | null, sectionIndex: number) => {
                  if (!caption) {
                    return null;
                  }
                  return (
                    <Slider.Caption
                      key={`${imageContainerProps.imageClassName}-caption-${sectionIndex}`}
                      copy={caption}
                    />
                  );
                }
              )}
            </figcaption>
          )}
        </AnimatePresence>
      );
    }
  };

  const renderAnimationProps = (animationName: string) => {
    switch (animationName) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
          transition: { duration: 0.5 },
        };
      case "modal":
        return {
          initial: {
            opacity: 0,
            y: "5%",
          },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: "-5%" },
          transition: { duration: 0.5 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
          transition: { duration: 0.5 },
        };
    }
  };

  return (
    <SliderDirectionContextProvider value={sliderDirection}>
      <FullScreenImageContainer
        currentSlideIndex={currentSlideIndex}
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

          <SafariDesktopWrapper overlay={slideShouldHaveOverlay}>
            <AnimatePresence>
              {screens.map((screen, i) => {
                const {
                  img,
                  alt,
                  slides,
                  className,
                  animation,
                  animationProps,
                } = screen;

                // Some slides might have multiple images on top of each other
                const shouldRenderImage = Array.isArray(slides)
                  ? slides.includes(currentSlideIndex)
                  : slides === currentSlideIndex;

                return (
                  shouldRenderImage && (
                    <Slider.Slide
                      sectionIndex={i}
                      key={`${imageContainerProps.imageClassName}-slide-${i}`}
                    >
                      {typeof img === "string" && (
                        <motion.img
                          key={`${imageContainerProps.imageClassName}-visual-${i}`}
                          src={img}
                          alt={alt}
                          className={className || ""}
                          {...renderAnimationProps(animation)}
                        />
                      )}
                      {Array.isArray(img) && animationProps && (
                        <ImageWithStepAnimation {...animationProps}>
                          {(
                            animationStep,
                            setAnimationStep,
                            pauseOnUserInteraction
                          ) => (
                            <>
                              {img.map((imgSrc, imgIndex: number) => (
                                <img
                                  src={imgSrc}
                                  alt=""
                                  key={`${imageContainerProps.imageClassName}-animated-visual-${i}-${imgIndex}`}
                                />
                              ))}
                            </>
                          )}
                        </ImageWithStepAnimation>
                      )}
                    </Slider.Slide>
                  )
                );
              })}
            </AnimatePresence>
          </SafariDesktopWrapper>

          <Slider.Button direction="Next" onClick={() => onNextButtonClick()} />
          <div
            aria-live="polite"
            aria-atomic="true"
            className="screenReaderText"
          >
            Item {currentSlideIndex} of {totalSlides}
          </div>
        </section>
        {renderCaptions()}
      </FullScreenImageContainer>
    </SliderDirectionContextProvider>
  );
};

export default BrowserSlider;
