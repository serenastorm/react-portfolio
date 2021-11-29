import { ReactNode } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { motion } from "framer-motion";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";
import { RouteProps } from "routes/types";
import { routes } from "routes/constants";
import {
  NavBar,
  NextPageLink,
  ProjectLink,
  ScrollProgress,
} from "CaseStudy/components";
import { Page } from "Main/components";

import "CaseStudy/styles/styles.scss";
import "./CaseStudyPage.scss";

type PageProps = {
  children: ReactNode;
  className?: string;
  endNotes?: {
    emoji: string;
    text: string;
    linkId: string;
    id: string;
  }[];
  intro?: string | ReactNode;
  nextPage?: RouteProps;
  title: string;
};

const CaseStudyPage = ({
  children,
  className = "",
  endNotes,
  intro,
  nextPage,
  title,
}: PageProps) => {
  const { pathname } = useLocation();
  const routesArray = Object.values(routes.myqr);

  const isIntroPage = matchPath(pathname, {
    path: routes.myqr.intro.url,
    exact: true,
    strict: false,
  });

  const isFinalPage = matchPath(pathname, {
    path: routes.myqr.features.url,
    exact: true,
    strict: false,
  });

  const camelCaseTitle = () => {
    return title
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  const getCurrentRouteIndex = () => {
    const currentRouteIndex = routesArray.findIndex((route) => {
      const match = matchPath(pathname, {
        path: route.url,
        exact: true,
        strict: false,
      });

      return !!match;
    });

    return currentRouteIndex;
  };

  const currentRouteIndex = getCurrentRouteIndex();

  const getNextRoute = () => {
    return routesArray[currentRouteIndex + 1];
  };

  return (
    <>
      {isIntroPage && <ScrollProgress />}

      <Page
        className={`${className} caseStudyPage caseStudyPage-${camelCaseTitle()}`}
      >
        {!isIntroPage && (
          <NavBar
            currentPageTitle={title}
            currentPageSectionIndex={currentRouteIndex}
          />
        )}
        {intro && (
          <motion.section
            className="caseStudyPage-intro"
            {...scrollAnimationWrapperProps}
          >
            <motion.p
              variants={scrollAnimationVariants({ delay: 0.15 })}
              role="text"
            >
              {intro}
            </motion.p>
            {endNotes && (
              <ul className="endNotes">
                {endNotes.map((note, noteIndex) => (
                  <motion.li
                    key={note.id}
                    id={note.id}
                    data-emoji={note.emoji}
                    variants={scrollAnimationVariants({
                      delay: 0.3 + noteIndex * 0.15,
                    })}
                  >
                    {note.text}{" "}
                    <a href={`#${note.linkId}`} className="underline-link">
                      Back to text
                    </a>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.section>
        )}
        <main>{children}</main>
        {isFinalPage ? (
          <ProjectLink isFooter />
        ) : (
          <NextPageLink nextPage={getNextRoute()} />
        )}
      </Page>
    </>
  );
};

export default CaseStudyPage;
