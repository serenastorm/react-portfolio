import { motion } from "framer-motion";
import { MenusSectionsVisuals, MenusSectionsCaptions } from "./constants";
import { scrollAnimationVariants } from "helpers/animations";

import { BrowserSlider } from "CaseStudy/components/BrowserSlider";

import "./Menus.scss";

const Menus = () => {
  return (
    <>
      <motion.p variants={scrollAnimationVariants({})}>
        The next step is the reason we're all here: it's time to create and edit
        a menu. A restaurant can have multiple menus; however, a menu can only
        be associated with one restaurant. In the future, it would be useful for
        chain owners to be able to copy menus across restaurants. This is a
        feature that similar websites like Deliveroo offer to business owners.
      </motion.p>
      <BrowserSlider
        bg="None"
        imageClassName="menus"
        captions={MenusSectionsCaptions}
        screens={MenusSectionsVisuals}
        slideIndicesWithOverlay={3}
        label=""
      />
    </>
  );
};

export default Menus;
