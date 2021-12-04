import { useState } from "react";
import { SkipToContentImage } from "CaseStudy/assets/Accessibility/SkipToContentLink";
import { ImageWrapper } from "CaseStudy/components/Image";
import { TabProps } from "CaseStudy/components/Tabs/types";
import { ContentRowWithVisual, Tabs } from "CaseStudy/components";
import { interactionsTabs } from "./constants";

import "./SkipToContentLink.scss";

const SkipToContentLink = () => {
  const [tab, setTab] = useState<TabProps>(interactionsTabs[1]);

  return (
    <ContentRowWithVisual
      imageBefore
      listItem="Keyboard users should be able to skip to the main content easily. Each page has a link at the top that isn’t visible unless focused with a keyboard."
    >
      <div className="accessibility-skipToContent-visual">
        <Tabs currentTab={tab} tabs={interactionsTabs} setTab={setTab}>
          <ImageWrapper className="img-skipToContent">
            <img
              src={SkipToContentImage.Bg}
              className="accessibility-skipToContent-img"
              alt={
                tab.value === "focused"
                  ? ""
                  : "Screenshot of the dashboard, zoomed in on the top left corner, without the 'Skip to main content' link."
              }
            />
            <img
              src={SkipToContentImage.Link}
              alt={
                tab.value === "focused"
                  ? "Screenshot of the dashboard, zoomed in on the top left corner, with a 'Skip to main content' link."
                  : ""
              }
              className="accessibility-skipToContent-img"
            />
          </ImageWrapper>
        </Tabs>
      </div>
    </ContentRowWithVisual>
  );
};

export default SkipToContentLink;
