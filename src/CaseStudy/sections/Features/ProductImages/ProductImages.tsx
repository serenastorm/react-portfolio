import { ImageWrapper } from "CaseStudy/components/Image";
import { ProductImage } from "CaseStudy/assets/Features/ProductImages";
import { useSliderDirectionContext } from "infrastructure/contexts";

import "./ProductImages.scss";

const ProductImages = () => {
  const sliderDirection = useSliderDirectionContext();

  return (
    <div className="img-productImages">
      <ImageWrapper animationDirection={sliderDirection}>
        <div className="img-productImages-img">
          <img
            src={ProductImage.Image}
            alt="Screenshot of a menu item with food photography loading into view."
          />
        </div>
        <img
          src={ProductImage.Copy}
          alt=""
          className="img-productImages-copy"
        />
      </ImageWrapper>
    </div>
  );
};

export default ProductImages;
