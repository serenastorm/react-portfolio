import { HelpSectionsVisuals, HelpSectionsCaptions } from "./constants";

import { BrowserSlider } from "CaseStudy/components";

import "./Help.scss";

const Help = () => {
  return (
    <BrowserSlider
      bg="Dark"
      imageClassName="help"
      captions={HelpSectionsCaptions}
      screens={HelpSectionsVisuals}
      slideIndicesWithOverlay={3}
      label=""
    />
  );
};

export default Help;
