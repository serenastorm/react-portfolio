import {
  ImageWithStepAnimation,
  ImageWrapper,
} from "CaseStudy/components/Image";
import { ModularItemImages } from "CaseStudy/assets/Features/ModularItem";
import { useSliderDirectionContext } from "infrastructure/contexts";

import "./ModularItem.scss";

const ModularItem = () => {
  const sliderDirection = useSliderDirectionContext();
  const keyboardAnimationSteps = 3;

  return (
    <ImageWithStepAnimation
      totalSteps={keyboardAnimationSteps}
      intervalInMs={1500}
      animationClassName="modularItem"
    >
      {(animationStep, setAnimationStep, pauseOnUserInteraction) => (
        <>
          <ImageWrapper animationDirection={sliderDirection}>
            {ModularItemImages.map((imgUrl, imgIndex) => (
              <img
                src={imgUrl}
                key={`img-dietaryInformation-${imgIndex}`}
                alt={
                  imgIndex === 0
                    ? "Recording of a user interacting with a menu item titled 'Burger'."
                    : ""
                }
                className="img-modularItem-choice"
              />
            ))}
          </ImageWrapper>
        </>
      )}
    </ImageWithStepAnimation>
  );
};

export default ModularItem;
