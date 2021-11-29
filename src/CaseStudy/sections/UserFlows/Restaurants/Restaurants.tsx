import { motion } from "framer-motion";
import {
  RestaurantsSectionsVisuals,
  RestaurantsSectionsCaptions,
} from "./constants";
import { BrowserSlider } from "CaseStudy/components";
import { scrollAnimationVariants } from "helpers/animations";

const Restaurants = () => {
  return (
    <>
      <motion.p variants={scrollAnimationVariants({})}>
        Now our user has added their first restaurant; maybe even two, if
        they're on a paid plan. They can already download and print their QR
        codes, even if they haven't set up any menus yet!
      </motion.p>
      <BrowserSlider
        bg="None"
        imageClassName="restaurants"
        captions={RestaurantsSectionsCaptions}
        screens={RestaurantsSectionsVisuals}
        slideIndicesWithOverlay={1}
        label="Features carousel"
      />
    </>
  );
};

export default Restaurants;
