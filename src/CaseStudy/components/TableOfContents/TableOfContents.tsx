import { useRef, useState, KeyboardEvent } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { motion } from "framer-motion";
import { GoToLinkIcon } from "CaseStudy/assets/Icons/Actions";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";
import { routes } from "infrastructure/routes/constants";

import "./TableOfContents.scss";

const TableOfContents = () => {
  const { pathname } = useLocation();

  const routesArray = Object.values(routes.myqr);
  const routesWithoutCurrentRoute = routesArray.filter((route) => {
    const match = matchPath(pathname, {
      path: route.url,
      exact: true,
      strict: false,
    });
    const isCurrentRoute = !!match;

    return !isCurrentRoute;
  });
  const initialRoute = pathname.startsWith(routesArray[0].url) ? 1 : 0;
  const [focusedNavLinkIndex, setFocusedNavLinkIndex] =
    useState<number>(initialRoute);
  const navLinksRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const onNavLinkKeyPressed = (
    event: KeyboardEvent<HTMLAnchorElement>,
    buttonIndex: number
  ) => {
    const totalNavLinks = routesWithoutCurrentRoute.length;

    if (event.key === "ArrowDown") {
      // Prevent scroll
      event.preventDefault();
      if (buttonIndex >= totalNavLinks - 1) {
        navLinksRefs?.current[0]?.focus();
        setFocusedNavLinkIndex(0);
      } else {
        navLinksRefs?.current[buttonIndex + 1]?.focus();
        setFocusedNavLinkIndex(buttonIndex + 1);
      }
    } else if (event.key === "ArrowUp") {
      // Prevent scroll
      event.preventDefault();
      if (buttonIndex <= 0) {
        navLinksRefs?.current[totalNavLinks - 1]?.focus();
        setFocusedNavLinkIndex(totalNavLinks - 1);
      } else {
        navLinksRefs?.current[buttonIndex - 1]?.focus();
        setFocusedNavLinkIndex(buttonIndex - 1);
      }
    }
  };

  return (
    <motion.nav
      key="nav"
      id="caseStudyPage-nav"
      className="contents-table"
      {...scrollAnimationWrapperProps}
    >
      <ol aria-labelledby="caseStudyPage-button">
        {routesArray.map((route, routeIndex) => {
          const match = matchPath(pathname, {
            path: route.url,
            exact: true,
            strict: false,
          });
          const isCurrentRoute = !!match;
          const routeIndexFromInactiveRouteArray =
            routesWithoutCurrentRoute.findIndex(
              (inactiveRoute) => inactiveRoute.url === route.url
            );

          return (
            <motion.li
              key={route.title}
              className={`caseStudyPage-navLink${
                isCurrentRoute ? " caseStudyPage-navLink-isCurrent" : ""
              }`}
              aria-current={isCurrentRoute ? "page" : "false"}
              variants={scrollAnimationVariants({
                delay: routeIndex * 0.15 + 0.2,
              })}
            >
              <Link
                to={isCurrentRoute ? "#" : route.url}
                tabIndex={
                  focusedNavLinkIndex === routeIndexFromInactiveRouteArray
                    ? 0
                    : -1
                }
                ref={(el: HTMLAnchorElement) =>
                  (navLinksRefs.current[routeIndexFromInactiveRouteArray] = el)
                }
                onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) =>
                  onNavLinkKeyPressed(event, routeIndexFromInactiveRouteArray)
                }
              >
                <span className="caseStudyPage-navLink-label">
                  {route.title}
                </span>
                <GoToLinkIcon />
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default TableOfContents;
