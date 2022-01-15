import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BlogArticleLink, Page } from "Main/components";
import {
  scrollAnimationWrapperProps,
  scrollAnimationVariants,
} from "helpers/animations";
import { usePosts } from "infrastructure/hooks";
import { getCategory } from "Main/pages/BlogCategory/constants";

import "./BlogCategory.scss";

const BlogCategoryPage = () => {
  const { search } = useLocation();
  const subcategory = new URLSearchParams(search).get("cat");
  const tag = new URLSearchParams(search).get("tag");

  const category = "snippets";

  const { posts, isLoading, isEmpty } = usePosts({
    category,
    subcategory,
    tag: tag ? getCategory(tag).value : null,
  });

  useEffect(() => {
    const tagSubtitle = tag && getCategory(tag).label;
    const subcategorySubtitle = subcategory && getCategory(subcategory).label;
    const subtitle = tagSubtitle || subcategorySubtitle;

    document.title = `${subtitle ? `${subtitle} | ` : ""}Snippets`;
  }, [tag, subcategory]);

  return (
    <Page className="blog blogPage blogCategory">
      <motion.h1 variants={scrollAnimationVariants({})}>
        {tag || subcategory ? (
          <>
            Snippets {tag ? "tagged" : "in"}:{" "}
            <span className="italic medium">
              {(tag && getCategory(tag).label) ||
                (subcategory && getCategory(subcategory).label)}
            </span>
          </>
        ) : (
          "All snippets"
        )}
      </motion.h1>
      <motion.ul className="blogPosts" {...scrollAnimationWrapperProps}>
        <BlogArticleLink
          posts={posts}
          isLoading={isLoading}
          isEmpty={isEmpty}
        />
      </motion.ul>
    </Page>
  );
};

export default BlogCategoryPage;
