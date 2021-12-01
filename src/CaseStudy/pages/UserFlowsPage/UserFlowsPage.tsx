import { CaseStudyPage } from "CaseStudy/pages";
import { UserFlowsSections } from "CaseStudy/sections";
import { SectionWithHeader } from "CaseStudy/components";

import "./UserFlowsPage.scss";

const UserFlowsPage = () => {
  return (
    <CaseStudyPage
      title="User flows"
      intro={
        <>
          Now that our user has explored our marketing site and decided to start
          using the product, they can click on any of the multiple{" "}
          <span className="bold">Get started</span> buttons that take them to
          the sign up page (or the dashboard if they're already signed in, of
          course).
        </>
      }
    >
      <UserFlowsSections.SignUp />
      <SectionWithHeader title="Errors & empty states">
        <UserFlowsSections.EmptyStates />
      </SectionWithHeader>
      <SectionWithHeader title="Managing restaurants">
        <UserFlowsSections.Restaurants />
      </SectionWithHeader>
      <SectionWithHeader title="Editing menus">
        <UserFlowsSections.Menus />
      </SectionWithHeader>
    </CaseStudyPage>
  );
};

export default UserFlowsPage;
