import {
  ImageWithStepAnimation,
  ImageWrapper,
} from "CaseStudy/components/Image";
import { ItemReorderingImages } from "CaseStudy/assets/Features/ItemReordering";
import { useSliderDirectionContext } from "contexts";

import "./ItemReordering.scss";

const ItemReordering = () => {
  const sliderDirection = useSliderDirectionContext();
  const keyboardAnimationSteps = 6;

  return (
    <>
      <ImageWithStepAnimation
        totalSteps={keyboardAnimationSteps}
        intervalInMs={1500}
        animationClassName="itemReordering"
      >
        {(animationStep, setAnimationStep, pauseOnUserInteraction) => (
          <>
            <ImageWrapper animationDirection={sliderDirection}>
              {ItemReorderingImages.map((imgUrl, imgIndex) => (
                <img
                  src={imgUrl}
                  key={`img-dietaryInformation-${imgIndex}`}
                  alt={
                    imgIndex === 0
                      ? "Recording of a user reordering menu items."
                      : ""
                  }
                  className="img-itemReordering-sideBar"
                />
              ))}
            </ImageWrapper>
          </>
        )}
      </ImageWithStepAnimation>
    </>
  );
};

export default ItemReordering;
