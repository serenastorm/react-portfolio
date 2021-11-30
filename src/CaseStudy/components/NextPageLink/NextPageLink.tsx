import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RouteProps } from "infrastructure/routes/types";
import { FullScreenText } from "CaseStudy/components";
import { scrollAnimationVariants } from "helpers/animations";

import "./NextPageLink.scss";

const NextPageLink = ({ nextPage }: { nextPage: RouteProps }) => {
  return (
    <FullScreenText isFooter>
      <Link
        to={nextPage.url}
        className="nextPage-link"
        title={`Go to ${nextPage.title.toLowerCase()} page`}
      />
      <motion.p variants={scrollAnimationVariants({})}>Next page</motion.p>
      <motion.h1 variants={scrollAnimationVariants({ delay: 0.15 })}>
        <span>{nextPage.title}</span>
      </motion.h1>
    </FullScreenText>
  );
};

export default NextPageLink;
