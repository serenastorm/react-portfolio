import { useState } from "react";
import { InformationColorImage } from "CaseStudy/assets/Accessibility/InformationColor";
import { ImageWrapper } from "CaseStudy/components/Image";
import { TabProps } from "CaseStudy/components/Tabs/types";
import { ContentRowWithVisual, Tabs } from "CaseStudy/components";

import "./InformationColor.scss";

const InformationColor = () => {
  const tabs: TabProps[] = [
    {
      value: "colour",
      label: "Colour",
    },
    {
      value: "gray",
      label: "Grayscale",
    },
  ];
  const [tab, setTab] = useState<TabProps>(tabs[0]);

  return (
    <ContentRowWithVisual
      listItem="It’s important not to rely solely on colour when trying to convey
    information; form errors have a warning icon next to them, and primary
    actions don’t have the same contrast as secondary ones."
    >
      <div className="accessibility-informationColor-visual">
        <Tabs bg="Light" currentTab={tab} tabs={tabs} setTab={setTab}>
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
