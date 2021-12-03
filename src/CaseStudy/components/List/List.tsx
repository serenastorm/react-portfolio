import { motion } from "framer-motion";
import {
  scrollAnimationWrapperProps,
  scrollAnimationVariants,
} from "helpers/animations";

import "./List.scss";

type InitialDelay = number;
type ListItemCopy = string;
type ListItemProps = { title: string; copy: ListItemCopy } | ListItemCopy;

type ListProps = {
  initialDelay?: InitialDelay;
  items: ListItemProps[];
  isFullScreen?: boolean;
};

const ListItem = ({
  copy,
  title,
  initialDelay,
  itemIndex,
}: {
  initialDelay: InitialDelay;
  copy: ListItemCopy;
  title?: string;
  itemIndex: number;
}) => {
  return (
    <motion.li
      variants={scrollAnimationVariants({
        delay: initialDelay + itemIndex * 0.1,
      })}
    >
      {title && <p>{title}</p>}
      <p>{copy}</p>
    </motion.li>
  );
};

const List = ({ initialDelay = 0, items, isFullScreen = true }: ListProps) => {
  return (
    <motion.ul
      className={`list ${isFullScreen ? "list-isFullScreen" : ""}`}
      {...scrollAnimationWrapperProps}
    >
      {items.map((item: ListItemProps, itemIndex: number) => (
        <ListItem
          copy={typeof item === "string" ? item : item.copy}
          title={typeof item === "string" ? undefined : item.title}
          initialDelay={initialDelay}
          itemIndex={itemIndex}
          key={`listItem-${itemIndex}`}
        />
      ))}
    </motion.ul>
  );
};

export default List;
