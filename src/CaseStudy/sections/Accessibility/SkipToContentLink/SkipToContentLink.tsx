import { SkipToContentImage } from "CaseStudy/assets/Accessibility/SkipToContentLink";
import { ImageWrapper } from "CaseStudy/components/Image";
import ContentRowWithVisual from "CaseStudy/components/ContentRowWithVisual/ContentRowWithVisual";

import "./SkipToContentLink.scss";

const SkipToContentLink = () => {
  return (
    <ContentRowWithVisual
      imageBefore
      listItem="Keyboard users should be able to skip to the main content easily. Each page has a link at the top that isn’t visible unless focused with a keyboard."
    >
      <ImageWrapper className="img-skipToContent">
        <img
          src={SkipToContentImage.Bg}
          alt="Animation of the dashboard, zoomed in on the top left corner. A 'Skip to main content' link fades in and out of the screen."
          className="accessibility-skipToContent-img"
        />
        <img
          src={SkipToContentImage.Link}
          alt=""
          className="accessibility-skipToContent-img"
        />
      </ImageWrapper>
    </ContentRowWithVisual>
  );
};

export default SkipToContentLink;
