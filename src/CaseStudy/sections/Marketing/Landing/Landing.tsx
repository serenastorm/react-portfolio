import { AnimatePresence } from "framer-motion";
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
  } = useSlider(totalSlides);

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
        (caption: string | string[], captionIndex: number) =>
          captionIndex === currentSlideIndex
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
              {captionsToRender
                .filter((caption) => !!caption)
                .map((caption: string[] | string, sectionIndex: number) => {
                  return (
                    <Slider.Caption
                      key={`${imageContainerProps.imageClassName}-caption-${sectionIndex}`}
                      copy={caption}
                    />
                  );
                })}
            </figcaption>
          )}
        </AnimatePresence>
      );
    }
  };

  return (
    <SliderDirectionContextProvider value={sliderDirection}>
      <FullScreenImageContainer
        currentSlideIndex={currentSlideIndex}
        bg="Dark"
        imageClassName="landing"
        // helpToggleTipCopy="Use the next and previous buttons to simulate scrolling in the landing page preview container."
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
                    >
                      {(
                        animationStep,
                        setAnimationStep,
                        pauseOnUserInteraction
                      ) => (
                        <>
                          {img.map((imgSrc, imgIndex: number) => (
                            <img
                              src={imgSrc}
                              alt={imgIndex === 0 ? alt : ""}
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
                      alt={alt}
                      className={className || ""}
                    />
                  );
                }
                // {
                //   Array.isArray(img) && animationProps && (
                //     <ImageWithStepAnimation {...animationProps}>
                //       {(
                //         animationStep,
                //         setAnimationStep,
                //         pauseOnUserInteraction
                //       ) => (
                //         <>
                //           {img.map((imgSrc, imgIndex: number) => (
                //             <img
                //               src={imgSrc}
                //               alt=""
                //               key={`${imageContainerProps.imageClassName}-animated-visual-${i}-${imgIndex}`}
                //             />
                //           ))}
                //         </>
                //       )}
                //     </ImageWithStepAnimation>
                //   );
                // }
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
