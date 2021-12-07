import { NewTabLink } from "Main/components";

import "./LandingPageFooter.scss";

const LandingPageFooter = () => {
  const contactEmail = "serena.antonetti@gmail.com";

  return (
    <footer>
      <p>
        Want to work together? Shoot me an email at{" "}
        <NewTabLink
          copy={contactEmail}
          to={`${contactEmail}?subject=Hi`}
          type="email"
        />
      </p>
    </footer>
  );
};

export default LandingPageFooter;
