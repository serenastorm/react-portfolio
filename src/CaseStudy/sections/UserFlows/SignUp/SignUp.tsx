import {
  FullScreenImageContainer,
  SafariDesktopWrapper,
} from "CaseStudy/components/Image";
import { SignUpImage } from "CaseStudy/assets/Marketing/SignUp";

const SignUp = () => {
  return (
    <FullScreenImageContainer bg="None" imageClassName="signUp">
      <SafariDesktopWrapper>
        <img
          src={SignUpImage}
          alt="Sign up page, with the following input fields: email address, password, and a terms and conditions checkbox."
        />
      </SafariDesktopWrapper>
    </FullScreenImageContainer>
  );
};

export default SignUp;
