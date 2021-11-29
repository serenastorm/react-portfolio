import { motion } from "framer-motion";
import {
  scrollAnimationWrapperProps,
  scrollAnimationVariants,
} from "helpers/animations";

import "./List.scss";

type ListItemCopy = string;
type ListItemProps = { title: string; copy: ListItemCopy } | ListItemCopy;

const ListItem = ({
  copy,
  title,
  itemIndex,
}: {
  copy: ListItemCopy;
  title?: string;
  itemIndex: number;
}) => {
  return (
    <motion.li variants={scrollAnimationVariants({ delay: itemIndex * 0.1 })}>
      {title && <p>{title}</p>}
      <p>{copy}</p>
    </motion.li>
  );
};

const List = ({
  items,
  isFullScreen = true,
}: {
  items: ListItemProps[];
  isFullScreen?: boolean;
}) => {
  return (
    <motion.ul
      className={`list ${isFullScreen ? "list-isFullScreen" : ""}`}
      {...scrollAnimationWrapperProps}
    >
      {items.map((item: ListItemProps, itemIndex: number) => (
        <ListItem
          copy={typeof item === "string" ? item : item.copy}
          title={typeof item === "string" ? undefined : item.title}
          itemIndex={itemIndex}
          key={`listItem-${itemIndex}`}
        />
      ))}
    </motion.ul>
  );
};

export default List;
