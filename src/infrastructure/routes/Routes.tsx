import { useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { BlogArticlePage, BlogCategoryPage, LandingPage } from "Main/pages";
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
              path={routes.home}
              component={LandingPage}
              key="landingPage"
            />
            <Route
              exact
              path={routes.myqr.intro.url}
              component={IntroPage}
              key="caseStudyIntro"
            />
            <Route
              exact
              path={routes.myqr.designSystem.url}
              component={DesignSystemPage}
              key="caseStudyDesignSystem"
            />
            <Route
              exact
              path={routes.myqr.dashboard.url}
              component={UserFlowsPage}
              key="caseStudyDashboard"
            />
            <Route
              exact
              path={routes.myqr.marketing.url}
              component={MarketingPage}
              key="caseStudyMarketing"
            />
            <Route
              exact
              path={routes.myqr.accessibility.url}
              component={AccessibilityPage}
              key="caseStudyAccessibility"
            />
            <Route
              exact
              path={routes.myqr.features.url}
              component={FeaturesPage}
              key="caseStudyFeatures"
            />
            <Route
              exact
              path={routes.blog.snippets.url}
              component={BlogCategoryPage}
              key="blogCategory"
            />
            <Route
              exact
              path={routes.blog.snippet.url()}
              component={BlogArticlePage}
              key="blogArticle"
            />
            <Redirect to={routes.home} />
          </Switch>
        </AnimatePresence>
      )}
    />
  );
};

export default Routes;
