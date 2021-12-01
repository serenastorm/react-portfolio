import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FullScreenImageContainer,
  ImageWithStepAnimation,
  SafariDesktopWrapper,
  SafariMobileWrapper,
} from "CaseStudy/components/Image";
import { ResponsivenessImages } from "CaseStudy/assets/Accessibility/Responsiveness";
import { Slider } from "CaseStudy/components";

import "./Responsiveness.scss";

const Responsiveness = () => {
  const totalAnimationDurationInMs = 6000;
  const desktopAnimationSteps = 2;
  const mobileAnimationSteps = 4;
  const desktopAnimationIntervalInMs =
    totalAnimationDurationInMs / desktopAnimationSteps;
  const mobileAnimationIntervalInMs =
    totalAnimationDurationInMs / mobileAnimationSteps;

  const getMobileButtonsImgSrc = (animationStep: number) => {
    switch (animationStep) {
      case 0:
        return ResponsivenessImages.Mobile.Buttons.Today;
      case 1:
        return ResponsivenessImages.Mobile.Buttons.NoneSelected;
      case 2:
        return ResponsivenessImages.Mobile.Buttons.DatePicker;
      case 3:
        return ResponsivenessImages.Mobile.Buttons.DatePicker;
    }
  };

  return (
    <FullScreenImageContainer
      bg="Light"
      imageClassName="responsiveness"
      helpToggleTipCopy="Switch between the desktop and mobile tab to preview the date picker component."
    >
      <div className="img-responsiveness-screens">
        <AnimatePresence>
          <ImageWithStepAnimation
            totalSteps={desktopAnimationSteps}
            intervalInMs={desktopAnimationIntervalInMs}
            animationClassName="responsiveness"
            animationStages={[
              "desktopCalendarIsHidden",
              "desktopCalendarIsVisible",
            ]}
            key="desktop"
          >
            {(...animationProps) => (
              <SafariDesktopWrapper>
                {ResponsivenessImages.Desktop.map((imgUrl, imgIndex) => (
                  <img
                    src={imgUrl}
                    key={`img-responsiveness-${imgIndex}`}
                    alt={
                      imgIndex === 0
                        ? "Animation of a user interacting with the dashboard's date picker on a laptop screen."
                        : ""
                    }
                  />
                ))}
              </SafariDesktopWrapper>
            )}
          </ImageWithStepAnimation>
          <ImageWithStepAnimation
            totalSteps={mobileAnimationSteps}
            intervalInMs={mobileAnimationIntervalInMs}
            animationClassName="responsiveness"
            animationStages={[
              "mobileButtonsTodayIsSelected",
              "mobileButtonsAreScrolled",
              "mobileCalendarIsVisible",
              "mobileCalendarIsVisible",
            ]}
            key="mobile"
          >
            {(animationStep, ...animationProps) => (
              <SafariMobileWrapper>
                <div className="img-responsiveness-mobile-screen">
                  <img
                    src={ResponsivenessImages.Mobile.SideBar}
                    alt="Animation of a user interacting with the dashboard's date picker on a phone screen."
                    className="img-responsiveness-mobile-sideBar"
                  />
                  <div className="img-responsiveness-mobile-dashBoard">
                    <img
                      src={
                        animationStep > 1
                          ? ResponsivenessImages.Mobile.Header.WithPicker
                          : ResponsivenessImages.Mobile.Header.WithoutPicker
                      }
                      alt=""
                      className="img-responsiveness-mobile-header"
                    />
                    <img
                      src={getMobileButtonsImgSrc(animationStep)}
                      alt=""
                      className="img-responsiveness-mobile-buttons"
                    />
                    <img
                      src={ResponsivenessImages.Mobile.Dashboard}
                      alt=""
                      className="img-responsiveness-mobile-dashBoardScreen"
                    />
                  </div>
                </div>
                <img
                  src={ResponsivenessImages.Mobile.Calendar}
                  alt=""
                  className="img-responsiveness-mobile-calendar"
                />
              </SafariMobileWrapper>
            )}
          </ImageWithStepAnimation>
        </AnimatePresence>
      </div>
      <figcaption>
        <Slider.Caption
          copy={[
            "On desktop, the functionality of custom inputs is the same as the native components', including keyboard interactions",
            "On mobile, they're replaced by native inputs",
          ]}
        />
      </figcaption>
    </FullScreenImageContainer>
  );
};

export default Responsiveness;
