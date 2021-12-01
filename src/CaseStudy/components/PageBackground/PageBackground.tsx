/* We need to separate the page background to animate it */

import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, matchPath } from "react-router-dom";
import {
  routes,
  caseStudySectionsTitles,
} from "infrastructure/routes/constants";
import { enterAndExitAnimationProps } from "helpers/animations";

import "./PageBackground.scss";

const PageBackground = () => {
  const { pathname } = useLocation();
  const caseStudyRoutes = Object.values(routes.myqr);

  const getCurrentRoute = () => {
    const currentRoute = caseStudyRoutes.find((route) => {
      const match = matchPath(pathname, {
        path: route.url,
        exact: true,
        strict: false,
      });

      return !!match;
    });

    return currentRoute?.title;
  };

  const currentRouteTitle = getCurrentRoute();

  const getBackgroundColorForCurrentRoute = useCallback(() => {
    switch (currentRouteTitle) {
      case caseStudySectionsTitles.marketing:
        return "dark";
      case caseStudySectionsTitles.dashboard:
        return "light";
      default:
        return "none";
    }
  }, [currentRouteTitle]);

  useEffect(() => {
    const bgColor =
      getBackgroundColorForCurrentRoute() === "dark" ? "#00003c" : "#ffffff";

    const existingMetaTag = document.querySelectorAll(
      '[name="theme-color"]'
    )[0];

    existingMetaTag.setAttribute("content", bgColor);
  }, [pathname, getBackgroundColorForCurrentRoute]);

  if (!pathname.startsWith("/myqr")) {
    return null;
  }

  return (
    <motion.div
      className="caseStudyPage-bg"
      {...enterAndExitAnimationProps({
        opacity: [0, 1],
      })}
      data-theme={getBackgroundColorForCurrentRoute()}
    />
  );
};

export default PageBackground;
