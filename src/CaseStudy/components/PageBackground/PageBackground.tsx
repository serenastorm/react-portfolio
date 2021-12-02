/* We need to separate the page background to animate it */

import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, matchPath } from "react-router-dom";
import {
  routes,
  caseStudySectionsTitles,
} from "infrastructure/routes/constants";

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

  const getBackgroundNameForCurrentRoute = useCallback(() => {
    switch (currentRouteTitle) {
      case caseStudySectionsTitles.marketing:
        return "dark";
      case caseStudySectionsTitles.dashboard:
        return "light";
      default:
        return "none";
    }
  }, [currentRouteTitle]);

  const getBackgroundColorForCurrentRoute = useCallback(() => {
    switch (currentRouteTitle) {
      case caseStudySectionsTitles.marketing:
        return "#00003c";
      case caseStudySectionsTitles.dashboard:
        return "#e0e8ff";
      default:
        return "#ffffff";
    }
  }, [currentRouteTitle]);

  useEffect(() => {
    const bgColor = getBackgroundColorForCurrentRoute();

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
      animate={{ backgroundColor: getBackgroundColorForCurrentRoute() }}
      transition={{ duration: 0.3 }}
      data-theme={getBackgroundNameForCurrentRoute()}
    />
  );
};

export default PageBackground;
