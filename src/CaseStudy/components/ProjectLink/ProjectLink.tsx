import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button, FullScreenText } from "CaseStudy/components";
import { NewTabLink } from "Main/components";
import {
  ConfirmIcon,
  CopyToClipboardIcon,
} from "CaseStudy/assets/Icons/Actions";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";
import { useCopyToClipboard } from "infrastructure/hooks";

import "./ProjectLink.scss";

type ProjectLinkProps = {
  isFooter?: boolean;
};

interface ProjectLinkWrapperProps extends ProjectLinkProps {
  children: ReactNode;
}

const ProjectLinkWrapper = ({ isFooter, children }: ProjectLinkWrapperProps) =>
  isFooter ? (
    <>{children}</>
  ) : (
    <motion.div className="projectLink" {...scrollAnimationWrapperProps}>
      {children}
    </motion.div>
  );

const ProjectLinkContent = () => {
  const contactEmail = "serena.antonetti@gmail.com";

  const {
    copyConfirmationProps,
    copyInputProps,
    onCopyButtonClick,
    textCopiedToClipboard,
  } = useCopyToClipboard(contactEmail);

  return (
    <>
      <motion.h2 variants={scrollAnimationVariants({})}>
        To see my work in progress,{" "}
        <NewTabLink
          copy="click here"
          to="https://myqr.studio/"
          shouldOpenInNewTab
        />
      </motion.h2>
      <motion.p variants={scrollAnimationVariants({ delay: 0.15 })}>
        Please email me at{" "}
        <NewTabLink
          copy={contactEmail}
          to={`${contactEmail}?subject=Portfolio%20credentials%20request`}
          type="email"
        />{" "}
        for log in credentials
      </motion.p>
      <input {...copyInputProps} />
      <Button animationProps={{ delay: 0.3 }} onClick={onCopyButtonClick}>
        {textCopiedToClipboard ? (
          <>
            <ConfirmIcon /> Copied!
          </>
        ) : (
          <>
            <CopyToClipboardIcon />
            Copy email address
          </>
        )}
      </Button>
      <div className="screenReaderText" {...copyConfirmationProps}>
        {textCopiedToClipboard && "Email copied to clipboard"}
      </div>
    </>
  );
};

const ProjectLink = ({ isFooter }: ProjectLinkProps) => {
  return isFooter ? (
    <FullScreenText isFooter>
      <ProjectLinkWrapper isFooter>
        <ProjectLinkContent />
      </ProjectLinkWrapper>
    </FullScreenText>
  ) : (
    <ProjectLinkWrapper>
      <ProjectLinkContent />
    </ProjectLinkWrapper>
  );
};

export default ProjectLink;
