import { CaseStudyPage } from "CaseStudy/pages";
import {
  FullScreenText,
  Paragraph,
  ProjectLink,
  TaskTrackerLink,
} from "CaseStudy/components";
import { TableOfContents } from "CaseStudy/components";
import { MyQrStudioLogo } from "CaseStudy/assets/Logos";
import { IntroSections } from "CaseStudy/sections";

import "./IntroPage.scss";

const IntroPage = () => {
  return (
    <CaseStudyPage title="home">
      <FullScreenText>
        <MyQrStudioLogo animationProps={{ duration: 3 }} />
        <div className="icon-scroll" />
      </FullScreenText>
      <IntroSections.IntroText />
      <IntroSections.ProjectPreview />
      <TableOfContents />
      <IntroSections.TechStack />
      <IntroSections.ResourcesList />
      <ProjectLink />
      <Paragraph header="Disclaimer">
        In the next few pages I'm going to talk about this project as it if were
        a real product; however this is purely a portfolio piece and I have no
        plans to bring it to life. I believe that being a good designer requires
        the ability to put oneself in other people's shoes; most of the time
        these people are users and stakeholders, but sometimes they're your boss
        or coworkers. I thought that working on such a project by myself would
        give me different perspectives about the work that goes into bringing an
        idea to life. And like most side projects, it was also a lot of fun!
      </Paragraph>
      <TaskTrackerLink />
    </CaseStudyPage>
  );
};

export default IntroPage;
