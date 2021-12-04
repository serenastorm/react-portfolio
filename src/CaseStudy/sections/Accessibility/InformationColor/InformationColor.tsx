import { useState } from "react";
import { InformationColorImage } from "CaseStudy/assets/Accessibility/InformationColor";
import { ImageWrapper } from "CaseStudy/components/Image";
import { ContentRowWithVisual, Tabs } from "CaseStudy/components";
import { TabProps } from "CaseStudy/components/Tabs/types";
import { colorFiltersTabs } from "./constants";

import "./InformationColor.scss";

const InformationColor = () => {
  const [tab, setTab] = useState<TabProps>(colorFiltersTabs[0]);

  return (
    <ContentRowWithVisual
      listItem="It’s important not to rely solely on colour when trying to convey
    information; form errors have a warning icon next to them, and primary
    actions don’t have the same contrast as secondary ones."
    >
      <div className="accessibility-informationColor-visual">
        <Tabs currentTab={tab} tabs={colorFiltersTabs} setTab={setTab}>
          <ImageWrapper>
            <img
              src={InformationColorImage.Color}
              alt={
                tab.value === "colour"
                  ? "Sign up form with an error indicated by a warning icon."
                  : ""
              }
            />
            {/* We can't use CSS filter here since it messes 
            up with framer-motion on Safari + Firefox so we 
            add the black and white image on top */}
            <img
              src={InformationColorImage.Bw}
              alt={
                tab.value === "colour"
                  ? ""
                  : "Sign up form with an error indicated by a warning icon. The form is in black and white."
              }
              data-visible={tab.value === "colour" ? "false" : "true"}
            />
          </ImageWrapper>
        </Tabs>
      </div>
    </ContentRowWithVisual>
  );
};

export default InformationColor;
