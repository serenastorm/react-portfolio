import { motion } from "framer-motion";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";
import { useWindowDimensions } from "infrastructure/hooks";

import "./IntroText.scss";

const IntroText = () => {
  const { windowWidth } = useWindowDimensions();
  const isDesktop = windowWidth >= 1200;

  return (
    <motion.section className="intro-text" {...scrollAnimationWrapperProps}>
      <dl>
        <div>
          <motion.dt variants={scrollAnimationVariants({})}>Year</motion.dt>
          <motion.dd
            variants={scrollAnimationVariants({ delay: isDesktop ? 0.25 : 0 })}
          >
            2021
          </motion.dd>
        </div>

        <div>
          <motion.dt variants={scrollAnimationVariants({})}>Roles</motion.dt>
          <motion.dd
            variants={scrollAnimationVariants({ delay: isDesktop ? 0.25 : 0 })}
          >
            Everything!
          </motion.dd>
        </div>
      </dl>
      <motion.p
        variants={scrollAnimationVariants({ delay: isDesktop ? 0 : 0.25 })}
      >
        A few months after the start of the pandemic, a lot of hospitality
        businesses around me started using QR codes to let patrons browse their
        menus while reducing physical contact with paper menus. As a user, I
        very quickly became frustrated with the experience; a lot of them felt
        like they weren't taking advantage of the digital format and displaying
        information the exact same way as on a paper menu. I was also surprised
        that none of them allowed me to order directly from my phone; which
        meant looking at the menu on my phone required the same ordering process
        as before, but with the extra step of scanning it. So I decided to set
        myself the challenge of creating a platform that would make the process
        more efficient, both for restaurant owners and their customers.
      </motion.p>
    </motion.section>
  );
};

export default IntroText;
