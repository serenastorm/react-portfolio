import {
  useCallback,
  useRef,
  useEffect,
  useState,
  KeyboardEvent,
  AriaAttributes,
} from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import { ExpandIcon, GoToLinkIcon } from "CaseStudy/assets/Icons/Actions";
import { ProjectLink, ScrollProgress } from "CaseStudy/components";
import {
  enterAndExitAnimationProps,
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";
import { routes } from "infrastructure/routes/constants";
import { addSection } from "infrastructure/redux/caseStudyCompletedSectionsReducer";

import "./NavBar.scss";

type NavBarProps = {
  currentPageTitle: string;
  currentPageSectionIndex: number;
};

const NavBar = ({ currentPageTitle, currentPageSectionIndex }: NavBarProps) => {
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
  const [isNavSticky, setIsNavSticky] = useState<boolean>(false);
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
  const [focusedNavLinkIndex, setFocusedNavLinkIndex] =
    useState<number>(initialRoute);
  const titleContainer = useRef<HTMLHeadingElement | null>(null);
  const navLinksRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const completedSections = useSelector(
    (state: RootStateOrAny) => state.caseStudyCompletedSections.value
  );
  const dispatch = useDispatch();

  const updateCompletedSections = useCallback(
    (sectionToAdd: number) => {
      if (completedSections.includes(sectionToAdd)) {
      } else {
        dispatch(addSection(sectionToAdd));
      }
    },
    [completedSections, dispatch]
  );

  useEffect(() => {
    const checkIfNavIsSticky = () => {
      if (titleContainer.current) {
        const titleContainerBoundingValues =
          titleContainer.current.getBoundingClientRect();

        const navShouldBeSticky =
          titleContainerBoundingValues.height * -1 >=
          titleContainerBoundingValues.top;

        setIsNavSticky(navShouldBeSticky);
      }
    };

    checkIfNavIsSticky();

    window.addEventListener("scroll", checkIfNavIsSticky);
    return () => window.removeEventListener("scroll", checkIfNavIsSticky);
  }, [titleContainer]);

  useEffect(() => {
    // Disable document scroll when the nav is expanded
    const shouldDocumentScrollBeDisabled = isNavSticky && isNavExpanded;

    if (shouldDocumentScrollBeDisabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isNavSticky, isNavExpanded]);

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
    } else if (event.key === "Escape") {
      setIsNavExpanded(false);
    }
  };

  const renderHeader = () => (
    <>
      <span className="caseStudyPage-sectionId">
        0{currentPageSectionIndex}
      </span>{" "}
      {currentPageTitle}
    </>
  );

  const navButtonProps = {
    id: "caseStudyPage-button",
    onClick: () => setIsNavExpanded(!isNavExpanded),
    "aria-haspopup": "menu" as AriaAttributes["aria-haspopup"],
    "aria-controls": "caseStudyPage-nav" as AriaAttributes["aria-controls"],
    "aria-expanded": isNavExpanded
      ? "true"
      : ("false" as AriaAttributes["aria-expanded"]),
    "aria-label": "Toggle main menu" as AriaAttributes["aria-label"],
  };

  return (
    <FocusTrap active={isNavExpanded}>
      <div
        className={`caseStudyPage-navbar${
          isNavSticky ? " caseStudyPage-navbar-iSticky" : ""
        }`}
        data-expanded={isNavExpanded ? "true" : "false"}
      >
        {/* Button for screen readers since the one in the 
      nav isn't rendered until the user scrolls down. */}
        <button
          className="screenReaderText"
          onFocus={() => setIsNavSticky(true)}
          // Button shouldn't be focusable when nav is open
          // since there's already another button
          tabIndex={isNavExpanded ? -1 : 0}
          {...navButtonProps}
        />
        <AnimatePresence>
          {isNavExpanded && (
            <motion.nav
              key="nav"
              id="caseStudyPage-nav"
              {...enterAndExitAnimationProps({
                opacity: [0, 1],
                y: ["-100%", 0, "-100%"],
              })}
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

                  // Intro page is always completed since user had to scroll down to get to the first page
                  const sectionIsCompleted =
                    routeIndex === 0
                      ? true
                      : completedSections.includes(routeIndex);

                  return (
                    <motion.li
                      key={route.title}
                      className={`caseStudyPage-navLink${
                        isCurrentRoute ? " caseStudyPage-navLink-isCurrent" : ""
                      }`}
                      aria-current={isCurrentRoute ? "page" : "false"}
                      {...enterAndExitAnimationProps({
                        opacity: [0, 1],
                        enterTransition: {
                          duration: 0.75,
                          delay: routeIndex * 0.15 + 0.25,
                        },
                        exitTransition: { duration: 0.25, delay: 0 },
                      })}
                    >
                      <Link
                        to={isCurrentRoute ? "#" : route.url}
                        onClick={() => setIsNavExpanded(false)}
                        tabIndex={
                          focusedNavLinkIndex ===
                          routeIndexFromInactiveRouteArray
                            ? 0
                            : -1
                        }
                        ref={(el: HTMLAnchorElement) =>
                          (navLinksRefs.current[
                            routeIndexFromInactiveRouteArray
                          ] = el)
                        }
                        onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) =>
                          onNavLinkKeyPressed(
                            event,
                            routeIndexFromInactiveRouteArray
                          )
                        }
                      >
                        <span
                          className="caseStudyPage-navLink-label"
                          data-completed={sectionIsCompleted ? "true" : "false"}
                        >
                          {route.title}
                        </span>
                        <GoToLinkIcon />
                      </Link>
                    </motion.li>
                  );
                })}
              </ol>
              <ProjectLink />
            </motion.nav>
          )}
          {(isNavSticky || isNavExpanded) && (
            <>
              <motion.div
                className="caseStudyPage-header caseStudyPage-header-isSticky"
                key="header"
                {...enterAndExitAnimationProps({
                  opacity: [0, 1],
                  y: ["-100%", 0, "-100%"],
                })}
              >
                <button
                  className="caseStudyPage-nav-button"
                  {...navButtonProps}
                />

                <header>
                  <ScrollProgress
                    shape="circle"
                    onScrollComplete={() =>
                      updateCompletedSections(currentPageSectionIndex)
                    }
                  />

                  <h1>{renderHeader()}</h1>
                  {isNavSticky && (
                    <ExpandIcon
                      className="caseStudyPage-nav-caret"
                      direction={isNavExpanded ? "up" : "down"}
                    />
                  )}
                </header>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="caseStudyPage-header">
          <motion.header {...scrollAnimationWrapperProps}>
            <motion.h1
              variants={scrollAnimationVariants({})}
              ref={titleContainer}
            >
              {renderHeader()}
            </motion.h1>
          </motion.header>
        </div>
      </div>
    </FocusTrap>
  );
};

export default NavBar;
