import {
  ImageWithStepAnimation,
  ImageWrapper,
} from "CaseStudy/components/Image";
import { DietaryInformationImage } from "CaseStudy/assets/Features/DietaryInformation";
import { useSliderDirectionContext } from "contexts";

import "./DietaryInformation.scss";

const DietaryInformation = () => {
  const sliderDirection = useSliderDirectionContext();
  const keyboardAnimationSteps = 6;

  return (
    <ImageWithStepAnimation
      totalSteps={keyboardAnimationSteps}
      intervalInMs={1500}
      animationClassName="dietaryInformation"
    >
      {(animationStep, setAnimationStep, pauseOnUserInteraction) => (
        <>
          <ImageWrapper animationDirection={sliderDirection}>
            <img
              src={DietaryInformationImage}
              alt="Screenshot of an allergen guide matching icons to their captions. For example, the 'Dairy free' icon shows a crossed out milk carton."
              className="img-dietaryInformation-sideBar"
            />
          </ImageWrapper>
        </>
      )}
    </ImageWithStepAnimation>
  );
};

export default DietaryInformation;
