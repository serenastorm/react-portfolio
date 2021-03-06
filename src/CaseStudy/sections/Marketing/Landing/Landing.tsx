import {
  ImageWithStepAnimation,
  FullScreenImageContainer,
  SafariDesktopWrapper,
} from "CaseStudy/components/Image";
import { SliderDirectionContextProvider } from "infrastructure/contexts";
import { Slider } from "CaseStudy/components";
import { LandingSectionVisuals, LandingSectionsCaptions } from "./constants";
import { useSlider } from "infrastructure/hooks";

import "CaseStudy/components/Slider/Slider.scss";

import "./Landing.scss";

const Landing = () => {
  const imageContainerProps = {
    bg: "Light",
    imageClassName: "landing",
  };

  const captions = LandingSectionsCaptions;

  const screens = LandingSectionVisuals;

  const totalSlides = screens.length;
  const {
    currentSlideIndex,
    onNextButtonClick,
    onPreviousButtonClick,
    sliderDirection,
    scrollContainerRef,
    dragContainerProps,
  } = useSlider(totalSlides);

  const renderCaptions = () => {
    if (!captions) {
      return null;
    } else if (typeof captions === "string") {
      return (
        <figcaption>
          <Slider.Caption copy={captions} />
        </figcaption>
      );
    } else {
      const captionsToRender = captions?.filter(
        (caption: string | string[], captionIndex: number) =>
          captionIndex === currentSlideIndex
      );
      return (
        <>
          {typeof captionsToRender === "string" && (
            <figcaption>
              <Slider.Caption copy={captionsToRender} />
            </figcaption>
          )}
          {Array.isArray(captionsToRender) && (
            <figcaption>
              {captionsToRender
                .filter((caption) => !!caption)
                .map((caption: string[] | string, sectionIndex: number) => {
                  return (
                    <Slider.Caption
                      copy={caption}
                      key={`${imageContainerProps.imageClassName}-caption-${sectionIndex}`}
                    />
                  );
                })}
            </figcaption>
          )}
        </>
      );
    }
  };

  return (
    <SliderDirectionContextProvider value={sliderDirection}>
      <FullScreenImageContainer
        currentSlideIndex={currentSlideIndex}
        bg="Dark"
        imageClassName="landing"
        containerRef={scrollContainerRef}
        dragContainerProps={dragContainerProps("top")}
      >
        <section className="imgSlider" aria-labelledby="carouselHeading">
          <h3 id="carouselHeading" className="screenReaderText">
            Landing page scrollable demo
          </h3>

          <Slider.Button
            direction="Prev"
            onClick={() => onPreviousButtonClick()}
          />

          <SafariDesktopWrapper>
            <div className="landing-screen">
              {screens.map((screen, i) => {
                const { img, alt, className } = screen;

                if (Array.isArray(img)) {
                  return (
                    <ImageWithStepAnimation
                      animationClassName={`landing-${i}`}
                      totalSteps={img.length}
                      intervalInMs={1500}
                      key={`landing-animation-${i}`}
                    >
                      {(...animationProps) => (
                        <>
                          {img.map((imgSrc, imgIndex: number) => (
                            <img
                              src={imgSrc}
                              alt={
                                imgIndex === 0 && i === currentSlideIndex
                                  ? alt
                                  : ""
                              }
                              key={`${imageContainerProps.imageClassName}-animated-visual-${i}-${imgIndex}`}
                            />
                          ))}
                        </>
                      )}
                    </ImageWithStepAnimation>
                  );
                } else {
                  return (
                    <img
                      key={`${imageContainerProps.imageClassName}-visual-${i}`}
                      src={img}
                      alt={i === currentSlideIndex ? alt : ""}
                      className={className || ""}
                    />
                  );
                }
              })}
            </div>
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

export default Landing;
