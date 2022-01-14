import { createElement } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CategoryLabels, CategoryUrls } from "Main/pages/BlogCategory/types";
import {
  scrollAnimationWrapperProps,
  scrollAnimationVariants,
} from "helpers/animations";
import { routes } from "infrastructure/routes/constants";

import "./Pill.scss";

type Color =
  | "tomato"
  | "red"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "indigo"
  | "blue"
  | "sky"
  | "cyan"
  | "teal"
  | "mint"
  | "green"
  | "grass"
  | "lime"
  | "yellow"
  | "amber"
  | "orange";

type PillProps = {
  animationDelay?: number;
  as?: "div" | "li";
  type: string;
};

const Pill = ({ animationDelay, as = "div", type }: PillProps) => {
  const getPillColor = (): {
    color: Color;
    label: CategoryLabels | string;
    url: CategoryUrls | "";
  } => {
    switch (type) {
      case "accessibility":
        return { color: "red", label: "Accessibility", url: "accessibility" };
      case "tsx":
        return { color: "pink", label: "TypeScript", url: "typescript" };
      case "jsx":
        return { color: "plum", label: "JavaScript", url: "javascript" };
      case "react":
        return { color: "purple", label: "React", url: "react" };
      case "html":
        return { color: "violet", label: "HTML", url: "html" };
      case "css":
        return { color: "sky", label: "CSS", url: "css" };
      case "scss":
        return { color: "cyan", label: "SCSS", url: "scss" };
      default:
        return { color: "lime", label: type, url: "" };
    }
  };

  const { color, label, url } = getPillColor();

  const shouldPillBeLink = as === "li";

  const renderChildren = () =>
    shouldPillBeLink
      ? createElement(
          Link,
          {
            to: {
              pathname: routes.blog.snippets.url,
              search: `?tag=${url}`,
            },
            title: `Snippets tagged ${label}`,
            className: `pill pill-${color}`,
          },
          label
        )
      : createElement("div", { className: `pill pill-${color}` }, label);

  const animationProps =
    shouldPillBeLink && animationDelay
      ? { variants: scrollAnimationVariants({ delay: animationDelay }) }
      : {};

  return createElement(
    shouldPillBeLink ? motion.li : as,
    { ...animationProps },
    renderChildren()
  );
};

export const Pills = ({ types }: { types: string[] }) => {
  return (
    <motion.ul className="pills" {...scrollAnimationWrapperProps}>
      {types.map((type, pillIndex: number) => (
        <Pill
          type={type}
          as="li"
          key={type}
          animationDelay={(pillIndex + 1) * 0.1}
        />
      ))}
    </motion.ul>
  );
};

export default Pill;
