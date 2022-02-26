import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  LikeButton,
  NewTabLink,
  Page,
  Pill,
  Pills,
  Sandpack,
} from "Main/components";
import { usePostNavigation, useSinglePost } from "infrastructure/hooks";
import { routes } from "infrastructure/routes/constants";
import {
  scrollAnimationWrapperProps,
  scrollAnimationVariants,
} from "helpers/animations";
import { ElementContent } from "react-markdown/lib/ast-to-react";
import { getCategory } from "Main/pages/BlogCategory/constants";

import "./BlogArticle.scss";

const BlogArticlePage = () => {
  const category = "snippets";
  const { slug }: { slug: string } = useParams();
  const { post, isLoading, isEmpty, likes } = useSinglePost(category, slug);
  const { previousPost, nextPost } = usePostNavigation(category, slug);
  const { fields, sys } = post || {};

  const {
    title,
    subcategory,
    content,
    tags,
    sandpackSettings,
    sandpackContent,
  } = fields || {};

  useEffect(() => {
    if (title) {
      document.title = `${title}${
        subcategory ? ` | ${getCategory(subcategory).label}` : ""
      }`;
    }
  }, [title, subcategory]);

  return (
    <>
      {!isLoading && (
        <a id="skiptocontent" href="#mainContent">
          Skip to main content
        </a>
      )}
      <Page className="blog blogPage blogArticle" as="article">
        <motion.header
          className="blogArticle-meta"
          key={`${subcategory}/${slug}/meta`}
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
        </motion.header>
        {isEmpty || !content || isLoading ? (
          <motion.h1 variants={scrollAnimationVariants({})}>
            {isLoading ? "Loading..." : "No article here."}
          </motion.h1>
        ) : (
          <motion.main
            id="mainContent"
            key={`${subcategory}/${slug}/mainContent`}
            {...scrollAnimationWrapperProps}
          >
            <motion.h1 variants={scrollAnimationVariants({})}>
              {title}
            </motion.h1>
            <motion.div variants={scrollAnimationVariants({ delay: 0.5 })}>
              <ReactMarkdown
                children={content}
                key="main"
                className="markdown"
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
                        (child.value === "View full criteria" ||
                          child.value === "View design pattern")
                    );

                    const isExternalLink = indexOfExternalLink > -1;

                    const nodeChildren: Array<
                      ElementContent & { value?: string }
                    > = node.children;
                    const linkCopy = nodeChildren[indexOfExternalLink]?.value;

                    return isExternalLink && href && !!linkCopy ? (
                      <NewTabLink
                        copy={linkCopy}
                        to={href}
                        shouldOpenInNewTab
                        className="medium"
                        withUnderline={false}
                      />
                    ) : (
                      <a {...props}>{children}</a>
                    );
                  },
                }}
              />
            </motion.div>
            {sandpackContent && sandpackSettings && (
              <>
                <motion.h2 variants={scrollAnimationVariants({})}>
                  Demo
                </motion.h2>
                <Sandpack markdown={sandpackContent} setup={sandpackSettings} />
              </>
            )}
          </motion.main>
        )}
        <footer className="blogArticle-nav">
          <motion.div
            className="blogArticle-navLink"
            key={`${subcategory}/${slug}/prevLink`}
            {...scrollAnimationWrapperProps}
          >
            {previousPost && (
              <>
                <motion.p variants={scrollAnimationVariants({})}>
                  Previous post
                </motion.p>
                <Link
                  to={`/${previousPost.fields.category}/${previousPost.fields.slug}`}
                >
                  <motion.h2
                    variants={scrollAnimationVariants({ delay: 0.25 })}
                  >
                    {previousPost.fields.title}
                  </motion.h2>
                </Link>
              </>
            )}
          </motion.div>
          <motion.div
            className="blogArticle-navLink"
            key={`${subcategory}/${slug}/nextLink`}
            {...scrollAnimationWrapperProps}
          >
            {nextPost && (
              <>
                <motion.p variants={scrollAnimationVariants({})}>
                  Next post
                </motion.p>
                <Link
                  to={`/${nextPost.fields.category}/${nextPost.fields.slug}`}
                >
                  <motion.h2
                    variants={scrollAnimationVariants({ delay: 0.25 })}
                  >
                    {nextPost.fields.title}
                  </motion.h2>
                </Link>
              </>
            )}
          </motion.div>
        </footer>
        {sys?.id && <LikeButton {...likes} articleId={sys.id} fixed />}
      </Page>
    </>
  );
};

export default BlogArticlePage;
