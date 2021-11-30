import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FullScreenImageContainer,
  ImageWithStepAnimation,
  SafariDesktopWrapper,
  SafariMobileWrapper,
} from "CaseStudy/components/Image";
import { ResponsivenessImages } from "CaseStudy/assets/Accessibility/Responsiveness";
import { TabProps } from "CaseStudy/components/Tabs/types";
import { Tabs } from "CaseStudy/components";
import { screenSizesTabs } from "./constants";
import { enterAndExitAnimationProps } from "helpers/animations";

import "./Responsiveness.scss";

const Responsiveness = () => {
  const [tab, setTab] = useState<TabProps>(screenSizesTabs[0]);
  const animationDirection = "right";
  const responsivenessAnimationDesktopSteps = 2;
  const responsivenessAnimationMobileSteps = 4;

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
      <Tabs currentTab={tab} tabs={screenSizesTabs} setTab={setTab}>
        <AnimatePresence exitBeforeEnter>
          {tab.value === "desktop" ? (
            <ImageWithStepAnimation
              animationDirection={animationDirection}
              totalSteps={responsivenessAnimationDesktopSteps}
              intervalInMs={2000}
              animationClassName="responsiveness"
              animationStages={[
                "desktopCalendarIsHidden",
                "desktopCalendarIsVisible",
              ]}
              key="desktop"
            >
              {(animationStep, setAnimationStep, pauseOnUserInteraction) => (
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
          ) : (
            <ImageWithStepAnimation
              animationDirection={animationDirection}
              totalSteps={responsivenessAnimationMobileSteps}
              intervalInMs={1500}
              animationClassName="responsiveness"
              animationStages={[
                "mobileButtonsTodayIsSelected",
                "mobileButtonsAreScrolled",
                "mobileCalendarIsVisible",
                "mobileCalendarIsVisible",
              ]}
              key="mobile"
            >
              {(animationStep, setAnimationStep, pauseOnUserInteraction) => (
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
          )}
        </AnimatePresence>
      </Tabs>
      <AnimatePresence exitBeforeEnter>
        {tab.value === "desktop" ? (
          <motion.p
            className="listItem"
            {...enterAndExitAnimationProps({
              opacity: [0, 1],
              y: ["10%", 0, "-10%"],
            })}
          >
            On desktop, the functionality of custom inputs is the same as the
            native components', including keyboard interactions
          </motion.p>
        ) : (
          <motion.p
            className="listItem"
            {...enterAndExitAnimationProps({
              opacity: [0, 1],
              y: ["10%", 0, "-10%"],
            })}
          >
            On mobile, they're replaced by native inputs
          </motion.p>
        )}
      </AnimatePresence>
    </FullScreenImageContainer>
  );
};

export default Responsiveness;
