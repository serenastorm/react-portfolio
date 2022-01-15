import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BlogArticleLink, NewTabLink, Page } from "Main/components";
import { LandingPageFooter } from "Main/components/LandingPageFooter";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";
import { projectLinks } from "./constants";
import { usePosts } from "infrastructure/hooks";
import { AnimatedLinkProps, LinkProps, ScreenReaderLinkProps } from "./types";

import "./LandingPage.scss";
import { GoToLinkIcon } from "CaseStudy/assets/Icons/Actions";
import { routes } from "infrastructure/routes/constants";

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
    <div className="project-img" />
    <dl className="project-description">
      <dt>
        {isExternal ? (
          <NewTabLink
            copy={label}
            to={url}
            shouldOpenInNewTab
            withUnderline={false}
          />
        ) : (
          <Link to={url}>{label}</Link>
        )}
      </dt>
      <dd>{description}</dd>
    </dl>
    {isExternal ? (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        href={url}
        target="blank"
        rel="noopener noreferrer"
        className="project-link"
        tabIndex={-1}
        aria-hidden="true"
      />
    ) : (
      <Link
        to={url}
        className="project-link"
        tabIndex={-1}
        aria-hidden="true"
      />
    )}
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
  const { posts, isLoading, isEmpty } = usePosts({
    category: "snippets",
  });
  const postsToDisplay = posts[0];

  useEffect(() => {
    document.title = "Portfolio | Serena Antonetti";
  }, []);

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
        portfolio on my{" "}
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
      <div className="blog">
        <motion.div className="blog-meta" {...scrollAnimationWrapperProps}>
          <motion.h2 variants={scrollAnimationVariants({})}>
            Last snippet
          </motion.h2>
          <motion.span variants={scrollAnimationVariants({})}>
            <Link to={routes.blog.snippets.url}>
              View all snippets <GoToLinkIcon />
            </Link>
          </motion.span>
        </motion.div>
        <motion.ul className="blogPosts" {...scrollAnimationWrapperProps}>
          <BlogArticleLink
            posts={[{ ...postsToDisplay }]}
            isLoading={isLoading}
            isEmpty={isEmpty}
          />
        </motion.ul>
      </div>

      <LandingPageFooter />
    </Page>
  );
};

export default LandingPage;
