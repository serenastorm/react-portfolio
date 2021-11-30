import { motion } from "framer-motion";
import { EmptyStatesSectionsVisuals } from "./constants";
import { BrowserSlider } from "CaseStudy/components";
import { scrollAnimationVariants } from "helpers/animations";

const EmptyStates = () => {
  return (
    <>
      <motion.p variants={scrollAnimationVariants({})}>
        The first thing freshly signed up users see is an empty state; so let's
        start by taking a look at some of the errors and empty states. The
        illustrations make them friendlier and the{" "}
        <abbr title="Call to Actions">CTAs</abbr> let the user know what's
        required from them.
      </motion.p>
      <BrowserSlider
        bg="None"
        imageClassName="emptyState"
        screens={EmptyStatesSectionsVisuals}
        label="Error and empty states examples carousel"
      />
    </>
  );
};

export default EmptyStates;
