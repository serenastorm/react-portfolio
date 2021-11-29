import { motion } from "framer-motion";
import { CaseStudyPage } from "CaseStudy/pages";
import { SectionWithHeader } from "CaseStudy/components";
import { NewTabLink } from "Main/components";
import { DesignSystemsSections } from "CaseStudy/sections";
import { scrollAnimationVariants } from "helpers/animations";

import "./DesignSystemPage.scss";

const DesignSystemPage = () => {
  return (
    <CaseStudyPage
      title="Design system"
      intro={
        <>
          myqr.studio is my most ambitious side project to date, and before I
          started I wasn't sure I would be able to achieve everything I wanted
          to{" "}
          <a id="linkToEndNote1" href="#endNote1" className="endNote-link">
            from a technical standpoint<sup>&#10035;</sup>
          </a>
          . For that reason, my initial design work was a bit different from my
          usual process. The research stage was straightforward; I looked at
          both my direct competitors and other{" "}
          <abbr title="Software as a service">SaaS</abbr> companies. However,
          the mocking up phase is where my process went off-track, since I was
          designing features one by one, while I was figuring out whether I
          could implement them or not. Having a solid design system and
          full-fledged React components allowed me to take a first pass at
          implementing complex features without the need for high-fidelity
          mocks.
          <br />
        </>
      }
      endNotes={[
        {
          emoji: "✳",
          text: "In the end, everything worked out, so lesson learned: I should believe in myself more...",
          linkId: "linkToEndNote1",
          id: "endNote1",
        },
      ]}
    >
      <DesignSystemsSections.UIKit />
      <SectionWithHeader title="Iconography" className="iconography">
        <motion.p variants={scrollAnimationVariants({ delay: 0.15 })}>
          A lot of the icons I've used come from the{" "}
          <NewTabLink
            copy="Ionicons"
            to="https://ionic.io/ionicons"
            shouldOpenInNewTab
          />{" "}
          open source library. With icon sets, consistency is crucial, so I made
          sure to keep the same stroke thickness for any custom icons I had to
          make. Most of the following icons are used in buttons, to make
          information easier to scan, but I'm also using icons to spice up some
          of the copy on the landing and help pages. I made these duotone, and
          even animated some of them with CSS.
        </motion.p>
        <DesignSystemsSections.Iconography />
      </SectionWithHeader>
      <SectionWithHeader title="Form components">
        <motion.p variants={scrollAnimationVariants({ delay: 0.15 })}>
          Out of all the Figma components I designed, form fields and buttons
          were definitely the ones with the most variants! You can check some of
          them out in the playgrounds below.
        </motion.p>
        <motion.p variants={scrollAnimationVariants({ delay: 0.3 })}>
          Note that the input component has even more variants, such as image
          inputs, select fields, etc. This is meant to be a preview, not the
          full-fledged component(s)!
        </motion.p>
      </SectionWithHeader>
      <SectionWithHeader title="Buttons">
        <DesignSystemsSections.Buttons />
      </SectionWithHeader>
      <SectionWithHeader title="Input fields">
        <DesignSystemsSections.FormFields />
      </SectionWithHeader>
    </CaseStudyPage>
  );
};

export default DesignSystemPage;
