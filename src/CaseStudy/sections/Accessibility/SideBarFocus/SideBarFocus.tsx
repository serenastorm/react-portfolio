import { useState } from "react";
import {
  FullScreenImageContainer,
  ImageWithStepAnimation,
  KeyboardArrows,
  SafariDesktopWrapper,
} from "CaseStudy/components/Image";
import { List } from "CaseStudy/components";
import { SideBarFocusImages } from "CaseStudy/assets/Accessibility/SideBarFocus";

import "./SideBarFocus.scss";

const SideBarFocus = () => {
  const [screenReaderText, setScreenReaderText] = useState<string | null>(null);
  const keyboardAnimationSteps = 7;
  const keyboardAnimationInterval = 1500;

  const updateScreenReaderText = (animationStep: number) => {
    setScreenReaderText(
      `Interactive preview link ${animationStep} of ${keyboardAnimationSteps} selected`
    );

    setTimeout(() => {
      setScreenReaderText(null);
    }, keyboardAnimationInterval);
  };

  return (
    <section aria-label="Focus states">
      <List
        items={[
          {
            title:
              "Keyboard users can navigate through related elements by using the arrow keys instead of the Tabs key.",
            copy: "The background of focused elements is a dark purple that isn’t used anywhere else. They also have an outline or underline so as to stand out even more.",
          },
        ]}
      />
      <FullScreenImageContainer bg="Light" imageClassName="sideBarFocus">
        <ImageWithStepAnimation
          totalSteps={keyboardAnimationSteps}
          intervalInMs={keyboardAnimationInterval}
          animationClassName="sideBarFocus"
        >
          {(animationStep, setAnimationStep, pauseOnUserInteraction) => (
            <>
              <SafariDesktopWrapper>
                {SideBarFocusImages.map((imgUrl, imgIndex) => (
                  <img
                    src={imgUrl}
                    key={`img-sideBarFocus-${imgIndex}`}
                    alt={
                      imgIndex === 0
                        ? "Interactive preview of the sidebar focus states, looping through each link."
                        : ""
                    }
                    className="img-sideBarFocus-sideBar"
                  />
                ))}
              </SafariDesktopWrapper>

              <KeyboardArrows
                animationStep={animationStep}
                keyPressed="bottom"
                clickableDirections={["bottom", "top"]}
                onArrowClick={(direction) => {
                  updateScreenReaderText(animationStep + 1);
                  if (direction === "bottom") {
                    setAnimationStep((currentStep: number) =>
                      currentStep >= keyboardAnimationSteps - 1
                        ? 0
                        : currentStep + 1
                    );
                    pauseOnUserInteraction(2000);
                  } else if (direction === "top") {
                    setAnimationStep((currentStep: number) =>
                      currentStep <= 0
                        ? keyboardAnimationSteps - 1
                        : currentStep - 1
                    );
                    pauseOnUserInteraction(2000);
                  }
                }}
              />
              <div
                aria-live="assertive"
                aria-relevant="additions"
                className="screenReaderText"
              >
                {screenReaderText}
              </div>
            </>
          )}
        </ImageWithStepAnimation>
      </FullScreenImageContainer>
    </section>
  );
};

export default SideBarFocus;
