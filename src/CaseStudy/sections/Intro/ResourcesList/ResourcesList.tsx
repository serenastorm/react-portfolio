import { motion } from "framer-motion";
import { NewTabLink } from "Main/components";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";

import "./ResourcesList.scss";

type ResourceProps = {
  label: string;
  url: string;
};

const resources: ResourceProps[] = [
  {
    label: "Adobe Color Contrast Analyzer",
    url: "https://color.adobe.com/create/color-contrast-analyzer",
  },
  {
    label: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference",
  },
  {
    label: "WAI-ARIA Authoring Practices",
    url: "https://www.w3.org/TR/wai-aria-practices-1.1/",
  },
  {
    label: "WCAG Web Accessibility Tutorials",
    url: "https://www.w3.org/WAI/tutorials/",
  },
  {
    label: "PixelTrue Clever Error State Illustrations",
    url: "https://www.pixeltrue.com/free-packs/error-state",
  },
  {
    label: "Ionicons",
    url: "https://ionic.io/ionicons",
  },
  // {
  //   label: "",
  //   url: "",
  // },
  // {
  //   label: "",
  //   url: "",
  // },
];

const ResourcesList = () => {
  return (
    <motion.section className="resources-list" {...scrollAnimationWrapperProps}>
      <motion.h2 variants={scrollAnimationVariants({})}>Resources</motion.h2>
      <ul>
        {resources.map((item, itemIndex) => (
          <motion.li
            key={item.url}
            variants={scrollAnimationVariants({
              delay: 0.15 * (itemIndex + 1),
            })}
          >
            <NewTabLink copy={item.label} to={item.url} shouldOpenInNewTab />
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};

export default ResourcesList;
