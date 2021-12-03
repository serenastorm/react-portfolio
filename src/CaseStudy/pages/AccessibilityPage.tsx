import { CaseStudyPage } from "CaseStudy/pages";
import { List, Tips } from "CaseStudy/components";
import { AccessibilitySections } from "CaseStudy/sections";

const AccessibilityPage = () => {
  return (
    <CaseStudyPage
      title="Accessibility"
      intro="The web should be accessible to everyone. One thing that matters to me is making sure that no one feels excluded when using something that I've made. I also believe that good accessibility can benefit all users, even those who don't have different usability needs. Here are some the accessibility decisions I made for this project:"
    >
      <List
        initialDelay={0.6}
        items={[
          {
            title:
              "Users can switch between default and high contrast theme from the homepage.",
            copy: "If a theme hasn’t explicitly been picked, respect browser/device preferences. I'm also working on a dark theme to help reduce eye strain.",
          },
          {
            title:
              "The main colour combinations in the default theme palette are WCAG AA compliant at a minimum.",
            copy: "The high contrast theme’s colours are all WCAG AAA compliant.",
          },
        ]}
      />
      <AccessibilitySections.ColorPalette />
      <List
        items={[
          "I used media queries to remove animations for users who turned on their browser’s reduced motion setting.",
        ]}
      />
      <AccessibilitySections.PrefersReducedMotion />
      <List
        items={[
          {
            title:
              "Keyboard users can navigate through related elements by using the arrow keys instead of the Tabs key.",
            copy: "The background of focused elements is a dark purple that isn’t used anywhere else. They also have an outline or underline so as to stand out even more.",
          },
        ]}
      />
      <AccessibilitySections.SideBarFocus />
      <AccessibilitySections.InformationColor />
      <AccessibilitySections.SkipToContentLink />
      <AccessibilitySections.Responsiveness />

      <List
        items={[
          "Font sizes are in rem units to work with different zoom settings.",
          "Buttons have sufficiently large touch areas.",
          {
            title: "Semantic HTML is used throughout.",
            copy: "When you know Javascript and its fancy frameworks it can be tempting to customise everything, but whenever the temptation arises I remind myself that HTML can be really powerful, and the simplest solutions are usually easier to maintain and compatible with most browsers.",
          },
        ]}
      />
      <Tips copy="When testing a website with a screen reader, cover your screen to make sure everything is truly keyboard accessible. Also check your website’s contrast in bright sunlight!" />
    </CaseStudyPage>
  );
};

export default AccessibilityPage;
