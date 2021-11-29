import { CaseStudyPage } from "CaseStudy/pages";
import { UserFlowsSections } from "CaseStudy/sections";
import { SectionWithHeader } from "CaseStudy/components";
import { List } from "CaseStudy/components/List";

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
      <SectionWithHeader title="Sign up">
        <UserFlowsSections.SignUp />
        <List
          items={[
            {
              title:
                "Sign up form fields are stripped down to the bare minimum.",
              copy: "Users only need to enter the information needed to make the site work at this stage. They get asked for additional information later, such as their chosen currency (when they create a menu) or their theme and notifications preferences (from the settings page).",
            },
            "Users can choose not to use passwords and request an email link instead.",
          ]}
        />
      </SectionWithHeader>
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
