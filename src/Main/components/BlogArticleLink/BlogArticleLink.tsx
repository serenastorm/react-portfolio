import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pills } from "Main/components";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";
import { BlogPostResponse, BlogPosts } from "infrastructure/blog/types";
import { GoToLinkIcon } from "CaseStudy/assets/Icons/Actions";
import { getCategory } from "Main/pages/BlogCategory/constants";
import { routes } from "infrastructure/routes/constants";

import "./BlogArticleLink.scss";

const BlogArticleLink = ({ posts, isLoading, isEmpty }: BlogPosts) => {
  const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const timeDivisions: {
    amount: number;
    name: Intl.RelativeTimeFormatUnit;
  }[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  const formatRelativeTime = (date: Date) => {
    let duration = (date.getTime() - new Date().getTime()) / 1000;

    for (let i = 0; i <= timeDivisions.length; i++) {
      const division = timeDivisions[i];
      if (Math.abs(duration) < division.amount) {
        return relativeTimeFormatter.format(
          Math.round(duration),
          division.name
        );
      }
      duration /= division.amount;
    }
  };

  if (isLoading) return <p className="italic medium">Loading...</p>;

  return isEmpty ? (
    <li className="blogPost">
      No posts to show.{" "}
      <Link to={routes.blog.snippets.url} className="semibold">
        All snippets <GoToLinkIcon />
      </Link>
    </li>
  ) : (
    <>
      {posts.map((post: BlogPostResponse, postIndex: number) => (
        <motion.li
          key={post.fields.slug}
          className="blogPost"
          {...scrollAnimationWrapperProps}
        >
          <Link to={`/${post.fields.category}/${post.fields.slug}`}>
            <motion.h3
              variants={scrollAnimationVariants({
                delay: (postIndex + 1) * 0.25,
              })}
            >
              {post.fields.title} <GoToLinkIcon />
            </motion.h3>
          </Link>
          {post.fields.shortText && (
            <motion.p
              variants={scrollAnimationVariants({
                delay: (postIndex + 1) * 0.25,
              })}
            >
              {post.fields.shortText}
            </motion.p>
          )}

          <motion.div
            className="blogArticle-meta"
            variants={scrollAnimationVariants({
              delay: (postIndex + 1) * 0.25,
            })}
          >
            <time dateTime={new Date(post.fields.date).toISOString()}>
              <p className="semibold">
                {formatRelativeTime(new Date(post.fields.date))}
                {post.fields.subcategory && (
                  <>
                    {"  "}
                    in{" "}
                    <Link
                      to={{
                        pathname: routes.blog.snippets.url,
                        search: `?cat=${post.fields.subcategory}`,
                      }}
                      className="medium"
                    >
                      {getCategory(post.fields.subcategory).label}
                    </Link>
                  </>
                )}
              </p>
            </time>
            {post.fields.tags && <Pills types={post.fields.tags} />}
          </motion.div>
        </motion.li>
      ))}
    </>
  );
};

export default BlogArticleLink;
