/* We need to separate the page background to animate it */

import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, matchPath } from "react-router-dom";
import {
  routes,
  caseStudySectionsTitles,
} from "infrastructure/routes/constants";

import "./PageBackground.scss";
import { usePrefersReducedMotion } from "infrastructure/hooks";

const PageBackground = () => {
  const userPrefersReducedMotion = usePrefersReducedMotion();
  const { pathname } = useLocation();
  const caseStudyRoutes = Object.values(routes);

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

  const getBackgroundForCurrentRoute = useCallback(() => {
    switch (currentRouteTitle) {
      case caseStudySectionsTitles.marketing:
        return { hex: "#00003c", label: "dark" };
      case caseStudySectionsTitles.dashboard:
        return { hex: "#e0e8ff", label: "light" };
      default:
        return { hex: "#ffffff", label: "none" };
    }
  }, [currentRouteTitle]);

  const currentBackground = getBackgroundForCurrentRoute();

  useEffect(() => {
    // Update the theme colors so the browser bar matches the background
    const existingMetaTag = document.querySelectorAll(
      '[name="theme-color"]'
    )[0];

    existingMetaTag.setAttribute("content", currentBackground.hex);
  }, [pathname, currentBackground]);

  return (
    <motion.div
      className="caseStudyPage-bg"
      initial={{ backgroundColor: "#ffffff" }}
      animate={{ backgroundColor: currentBackground.hex }}
      transition={{ duration: userPrefersReducedMotion ? 0 : 0.3 }}
      data-theme={currentBackground.label}
    />
  );
};

export default PageBackground;
