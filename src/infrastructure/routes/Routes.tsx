import { useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  AccessibilityPage,
  DesignSystemPage,
  UserFlowsPage,
  IntroPage,
  FeaturesPage,
  MarketingPage,
} from "CaseStudy/pages";

import { routes } from "./constants";

const Routes = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <Route
      render={({ location }) => (
        <AnimatePresence exitBeforeEnter>
          <Switch location={location}>
            <Route
              exact
              path={routes.intro.url}
              component={IntroPage}
              key="caseStudyIntro"
            />
            <Route
              exact
              path={routes.designSystem.url}
              component={DesignSystemPage}
              key="caseStudyDesignSystem"
            />
            <Route
              exact
              path={routes.dashboard.url}
              component={UserFlowsPage}
              key="caseStudyDashboard"
            />
            <Route
              exact
              path={routes.marketing.url}
              component={MarketingPage}
              key="caseStudyMarketing"
            />
            <Route
              exact
              path={routes.accessibility.url}
              component={AccessibilityPage}
              key="caseStudyAccessibility"
            />
            <Route
              exact
              path={routes.features.url}
              component={FeaturesPage}
              key="caseStudyFeatures"
            />
            <Redirect to={routes.intro.url} />
          </Switch>
        </AnimatePresence>
      )}
    />
  );
};

export default Routes;
