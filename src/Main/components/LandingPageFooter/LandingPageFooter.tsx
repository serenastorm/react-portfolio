import { useCopyToClipboard } from "hooks";
import { NewTabLink } from "Main/components";

import "./LandingPageFooter.scss";

const LandingPageFooter = () => {
  const contactEmail = "serena.antonetti@gmail.com";

  const {
    copyConfirmationProps,
    copyInputProps,
    onCopyButtonClick,
    textCopiedToClipboard,
  } = useCopyToClipboard(contactEmail);

  return (
    <footer>
      <p>
        Want to work together? Shoot me an email at{" "}
        <NewTabLink
          copy={contactEmail}
          to={`${contactEmail}?subject=Hi`}
          type="email"
        />
        <br />
        <span className="smaller" {...copyConfirmationProps}>
          {textCopiedToClipboard ? (
            <>
              Email address copied!
              {/* Add fake button to prevent the height jumping when the copy changes */}
              <button
                className="email-link"
                tabIndex={-1}
                aria-hidden="true"
                style={{ opacity: 0 }}
              >
                .
              </button>
            </>
          ) : (
            <>
              If the email link doesn't work,{" "}
              <button onClick={onCopyButtonClick} className="email-link">
                click here to copy my email address
              </button>
            </>
          )}
        </span>
      </p>
      <input {...copyInputProps} />
    </footer>
  );
};

export default LandingPageFooter;
