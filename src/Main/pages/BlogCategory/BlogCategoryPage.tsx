import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BlogArticleLink,
  NewTabLink,
  Page,
  Pill,
  Pills,
} from "Main/components";
import { LandingPageFooter } from "Main/components/LandingPageFooter";
import {
  scrollAnimationWrapperProps,
  scrollAnimationVariants,
} from "helpers/animations";
import { usePosts } from "infrastructure/hooks";
import { BlogPostResponse } from "infrastructure/blog/types";
import { GoToLinkIcon } from "CaseStudy/assets/Icons/Actions";
import { getCategory } from "Main/pages/BlogCategory/constants";
import { routes } from "infrastructure/routes/constants";

import "./BlogCategory.scss";

const BlogCategoryPage = () => {
  const { search } = useLocation();
  const subcategory = new URLSearchParams(search).get("cat");
  const tag = new URLSearchParams(search).get("tag");

  const isDesktop = true;
  const category = "snippets";

  const { posts, isLoading, isEmpty } = usePosts({
    category,
    subcategory,
    tag: tag ? getCategory(tag).value : null,
  });

  return (
    <Page className="blog blogPage blogCategory">
      <motion.h1 variants={scrollAnimationVariants({})}>
        {tag || subcategory ? (
          <>
            Snippets tagged:{" "}
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
