import { CaseStudyPage } from "CaseStudy/pages";
import {
  DemoSlider,
  List,
  Paragraph,
  TaskTrackerLink,
} from "CaseStudy/components";
import { NewFeaturesSections, NewFeaturesListItems } from "CaseStudy/sections";

import "./FeaturesPage.scss";

export const FeaturesSections = [
  // {
  //   el: <NewFeaturesSections.ItemReordering />,
  //   copy: "Reordering menu items & categories",
  // },
  { el: <NewFeaturesSections.ProductImages />, copy: "Adding product images" },
  {
    el: <NewFeaturesSections.DietaryInformation />,
    copy: "Expanding the dietary information icon set",
  },
  {
    el: <NewFeaturesSections.ModularItem />,
    copy: "Support for modular items",
  },
];

const FeaturesPage = () => {
  return (
    <CaseStudyPage
      title="Features"
      intro={
        <>
          Now that we've gone over the existing product, let's talk about the
          future! Overall, I'm pretty happy with the current functionality, but
          there's quite a few features that I think are missing at the moment:
        </>
      }
    >
      <DemoSlider
        bg="Light"
        imageClassName="itemReordering"
        slides={FeaturesSections}
        label="Features carousel"
      />

      <List items={NewFeaturesListItems} />
      <Paragraph header="Thanks for reading!">
        We've reached the end of this case study. Whether you're a recruiter or
        a fellow designer, I hope you found it useful and that it gave you an
        insight into how I solve problems. Please don't hesitate to contact me
        if you're interested in working together.
      </Paragraph>
      <TaskTrackerLink />
    </CaseStudyPage>
  );
};

export default FeaturesPage;
