import {
  FullScreenImageContainer,
  SafariDesktopWrapper,
} from "CaseStudy/components/Image";
import { List, Tips, SectionWithHeader } from "CaseStudy/components";
import { SignUpImage } from "CaseStudy/assets/Marketing/SignUp";

import "./SignUp.scss";

const SignUp = () => {
  return (
    <SectionWithHeader title="Sign up">
      <FullScreenImageContainer bg="None" imageClassName="signUp">
        <SafariDesktopWrapper>
          <img
            src={SignUpImage}
            alt="Sign up page, with the following input fields: email address, password, and a terms and conditions checkbox."
          />
        </SafariDesktopWrapper>
      </FullScreenImageContainer>
      <List
        items={[
          {
            title: "Sign up form fields are stripped down to the bare minimum.",
            copy: "Users only need to enter the information needed to make the site work at this stage. They get asked for additional information later, such as their chosen currency (when they create a menu) or their theme and notifications preferences (from the settings page).",
          },
          "Users can choose not to use passwords and request an email link instead.",
        ]}
      />
      <Tips copy="One way to simplify the sign up flow I've seen being used is only showing one form field per screen. This can mess with password managers which impacts the user experience and the security of your app as password managers make people use stronger passwords." />
    </SectionWithHeader>
  );
};

export default SignUp;
