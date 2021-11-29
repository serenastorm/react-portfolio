import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NewTabLink, Page } from "Main/components";
import { LandingPageFooter } from "Main/components/LandingPageFooter";
import { scrollAnimationVariants } from "helpers/animations";
import { projectLinks } from "./constants";
import { AnimatedLinkProps, LinkProps, ScreenReaderLinkProps } from "./types";

import "./LandingPage.scss";

const ProjectLink = ({
  animationDelay,
  label,
  description,
  url,
  isExternal,
}: AnimatedLinkProps) => (
  <motion.div
    className="project"
    variants={scrollAnimationVariants({ delay: animationDelay })}
  >
    <dt>
      {isExternal ? (
        <NewTabLink copy={label} to={url} shouldOpenInNewTab />
      ) : (
        <Link to={url} className="underline-link">
          {label}
        </Link>
      )}
    </dt>
    <dd>{description}</dd>
  </motion.div>
);

const ScrenReaderLink = ({ text, url, label }: ScreenReaderLinkProps) => (
  <span className="link">
    {/* We need to add the text both before and after the link:
     before so it's read by screen readers in the right order,
     after so we can target it in CSS to add focus styles to the link */}
    <span className="screenReaderText">{text}</span>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${label} (opens in a new tab)`}
    >
      {label} (opens in a new tab)
    </a>
    <span className="link-text" aria-hidden="true">
      {text}
    </span>
  </span>
);

const LandingPage = () => {
  return (
    <Page className="landingPage">
      {/* ARIA role="text" prevents 'text splitting' in VoiceOver iOS https://axesslab.com/text-splitting/  */}
      <motion.h1 variants={scrollAnimationVariants({})} role="text">
        Hi, I’m{" "}
        <ScrenReaderLink
          text="Serena,"
          url="https://www.linkedin.com/in/serena-antonetti"
          label="Visit Linkedin profile"
        />{" "}
        a product designer & front-end developer currently based in Edinburgh. I
        recently worked at{" "}
        <ScrenReaderLink
          text="Storm&nbsp;Ideas,"
          url="https://stormideas.com/"
          label="Visit Storm Ideas' website"
        />{" "}
        where most of my projects were under{" "}
        <abbr title="Non Disclosure Agreements">NDAs</abbr>, but you can find
        some of my public works below. You can also check out the code for this
        website on my{" "}
        <ScrenReaderLink
          text="Github."
          url="https://github.com/serenastorm/react-portfolio"
          label="View source code on Github"
        />{" "}
      </motion.h1>
      <dl className="projects">
        {projectLinks.map((project: LinkProps, projectIndex: number) => (
          <ProjectLink
            {...project}
            key={project.label}
            animationDelay={(projectIndex + 1) * 0.1}
          />
        ))}
      </dl>
      <LandingPageFooter />
    </Page>
  );
};

export default LandingPage;
