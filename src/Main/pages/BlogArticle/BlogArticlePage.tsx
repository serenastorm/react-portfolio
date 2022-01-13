import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { NewTabLink, Page, Pill, Pills } from "Main/components";
import { useSinglePost } from "infrastructure/hooks";
import { routes } from "infrastructure/routes/constants";
import {
  scrollAnimationWrapperProps,
  scrollAnimationVariants,
} from "helpers/animations";
import { getCategory } from "Main/pages/BlogCategory/constants";

import "./BlogArticle.scss";

const BlogArticlePage = () => {
  const category = "snippets";
  const { slug }: { slug: string } = useParams();

  const { post, isLoading, isEmpty } = useSinglePost(category, slug);

  const hideNavigation = true;
  const forceRefresh = true;
  const hideDevTools = true;
  const modules = "/src/App.tsx,/src/styles/demo.scss";

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title}${
        post.subcategory ? ` | ${getCategory(post.subcategory).label}` : ""
      }`;
    }
  }, [post]);

  if (isLoading) {
    return null;
  }

  const { title, subcategory, content, tags, codeSandboxId } = post || {};

  return (
    <>
      <a id="skiptocontent" href="#mainContent">
        Skip to main content
      </a>
      <Page className="blog blogPage blogArticle">
        <motion.div
          className="blogArticle-meta"
          {...scrollAnimationWrapperProps}
        >
          <motion.p variants={scrollAnimationVariants({})}>
            <Link to={`/${category}`}>Code Snippets</Link>
            {subcategory && (
              <>
                {" "}
                /{" "}
                <Link
                  to={{
                    pathname: routes.blog.snippets.url,
                    search: `?cat=${subcategory}`,
                  }}
                >
                  {getCategory(subcategory).label}
                </Link>
              </>
            )}
          </motion.p>
          {tags && <Pills types={tags} />}
        </motion.div>
        {isEmpty || !content ? (
          <>
            <motion.h1 variants={scrollAnimationVariants({})}>
              No article here.
            </motion.h1>
          </>
        ) : (
          <motion.main id="mainContent" {...scrollAnimationWrapperProps}>
            <motion.h1 variants={scrollAnimationVariants({})}>
              {title}
            </motion.h1>
            <ReactMarkdown
              children={content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const renderSnippet = () => (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                  return inline ? (
                    renderSnippet()
                  ) : (
                    <pre>
                      {match && <Pill type={match[1]} />}
                      {renderSnippet()}
                    </pre>
                  );
                },
                pre({ children }) {
                  return <>{children}</>;
                },
                a({ children, node, href, ...props }) {
                  const indexOfExternalLink = node.children.findIndex(
                    (child) =>
                      child.type === "text" &&
                      child.value === "View full criteria"
                  );

                  const isExternalLink = indexOfExternalLink > -1;

                  return isExternalLink && href ? (
                    <NewTabLink
                      copy={node.children[indexOfExternalLink].value}
                      to={href}
                      shouldOpenInNewTab
                      className="bold"
                    />
                  ) : (
                    <a {...props}>{children}</a>
                  );
                },
              }}
            />
            {codeSandboxId && (
              <>
                <motion.h2 variants={scrollAnimationVariants({})}>
                  Demo
                </motion.h2>
                <motion.iframe
                  variants={scrollAnimationVariants({})}
                  title={codeSandboxId}
                  src={`https://codesandbox.io/embed/${codeSandboxId}?codemirror=1&editorsize=0&hidenavigation=${
                    hideNavigation ? 1 : 0
                  }&forcerefresh=${forceRefresh ? 1 : 0}&hidedevtools=${
                    hideDevTools ? 1 : 0
                  }&theme=light&module=${modules}`}
                  style={{
                    width: "100%",
                    height: "70vh",
                    border: 0,
                    borderRadius: "0.4rem",
                    overflow: "hidden",
                  }}
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                />
              </>
            )}
          </motion.main>
        )}
      </Page>
    </>
  );
};

export default BlogArticlePage;
