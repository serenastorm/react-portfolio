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
              src={InformationColorImage}
              alt="Sign up form with an error indicated by a warning icon."
              className={`accessibility-informationColor-img${
                tab.value === "colour"
                  ? ""
                  : " accessibility-informationColor-img-gray"
              }`}
            />
          </ImageWrapper>
        </Tabs>
      </div>
    </ContentRowWithVisual>
  );
};

export default InformationColor;
