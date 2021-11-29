import { motion } from "framer-motion";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";

import "./TechStack.scss";

type ListItemsProps = {
  items: string[];
};

const ListItems = ({ items }: ListItemsProps) => (
  <ul className="tech-stack">
    {items.map((item, itemIndex) => (
      <motion.li
        key={item}
        variants={scrollAnimationVariants({ delay: 0.15 * (itemIndex + 1) })}
      >
        {item}
      </motion.li>
    ))}
  </ul>
);

const TechStack = () => {
  return (
    <motion.section className="tech-stacks" {...scrollAnimationWrapperProps}>
      <motion.h2 variants={scrollAnimationVariants({})}>
        Tech & design stack
      </motion.h2>
      <ListItems items={["Figma", "SCSS"]} />
      <ListItems items={["React", "Firebase", "Redux", "Typescript"]} />
    </motion.section>
  );
};

export default TechStack;
