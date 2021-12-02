import {
  ImageWithStepAnimation,
  ImageWrapper,
} from "CaseStudy/components/Image";
import { ItemReorderingImages } from "CaseStudy/assets/Features/ItemReordering";
import { useSliderDirectionContext } from "infrastructure/contexts";

import "./ItemReordering.scss";

const ItemReordering = () => {
  const sliderDirection = useSliderDirectionContext();
  const keyboardAnimationSteps = 6;

  return (
    <ImageWithStepAnimation
      totalSteps={keyboardAnimationSteps}
      intervalInMs={1500}
      animationClassName="itemReordering"
    >
      {(...animationProps) => (
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
            />
          ))}
        </ImageWrapper>
      )}
    </ImageWithStepAnimation>
  );
};

export default ItemReordering;
