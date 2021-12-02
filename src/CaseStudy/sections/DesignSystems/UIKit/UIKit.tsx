import { FullScreenImageContainer } from "CaseStudy/components/Image";
import { ImageWrapper } from "CaseStudy/components/Image";
import { UIKitImage } from "CaseStudy/assets/DesignSystem/UIKit";

import "./UIKit.scss";

const UIKit = () => {
  return (
    <FullScreenImageContainer bg="None" imageClassName="uiKit">
      <ImageWrapper className="imgWrapper-uiKit">
        {UIKitImage.map((imgSrc, imgIndex) => (
          <img
            src={imgSrc}
            key={`uiKit-img-${imgIndex}`}
            alt={
              imgIndex === 0
                ? "Mozaic of various UI elements, such as buttons, modals, and form inputs."
                : ""
            }
          />
        ))}
      </ImageWrapper>
    </FullScreenImageContainer>
  );
};

export default UIKit;
