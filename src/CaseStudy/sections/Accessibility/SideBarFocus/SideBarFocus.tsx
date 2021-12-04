import {
  FullScreenImageContainer,
  ImageWithStepAnimation,
  KeyboardArrows,
  SafariDesktopWrapper,
} from "CaseStudy/components/Image";
import { SideBarFocusImages } from "CaseStudy/assets/Accessibility/SideBarFocus";

import "./SideBarFocus.scss";

const SideBarFocus = () => {
  const keyboardAnimationSteps = 7;
  return (
    <FullScreenImageContainer
      bg="Light"
      imageClassName="sideBarFocus"
    >
      <ImageWithStepAnimation
        totalSteps={keyboardAnimationSteps}
        intervalInMs={1500}
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
            {/* <div className="imgWrapper" >
              {SideBarFocusImages.map((imgUrl) => (
                <img src={imgUrl} alt="" className="img-sideBarFocus-sideBar" />
              ))}
            </div> */}
            <KeyboardArrows
              animationStep={animationStep}
              keyPressed="bottom"
              clickableDirections={["bottom", "top"]}
              onArrowClick={(direction) => {
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
          </>
        )}
      </ImageWithStepAnimation>
    </FullScreenImageContainer>
  );
};

export default SideBarFocus;
