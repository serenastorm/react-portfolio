import { CaseStudyPage } from "CaseStudy/pages";
import { SectionWithHeader } from "CaseStudy/components";
import { MarketingSections } from "CaseStudy/sections";

import "./MarketingPage.scss";

const MarketingPage = () => {
  return (
    <CaseStudyPage
      title="Marketing"
      intro={
        <>
          Having a solid product is good for retaining existing users, but a
          striking marketing website is great for bringing new ones. This
          section focuses on some product and design decisions I made for the
          landing, pricing, and help pages. Use the previous and next buttons to
          navigate through the carousels. You'll recognise some of the
          components from the design system!
        </>
      }
    >
      <MarketingSections.Landing />
      <MarketingSections.Pricing />
      <SectionWithHeader title="Help & documentation">
        <MarketingSections.Help />
      </SectionWithHeader>
    </CaseStudyPage>
  );
};

export default MarketingPage;
