import { useEffect, useState } from "react";
import {
  BlogPostResponse,
  NavigationBlogPosts,
} from "infrastructure/blog/types";

import { client } from "infrastructure/blog/contentful";

export default function usePostNavigation(
  currentPostDate?: Date
): NavigationBlogPosts {
  const [previousPost, setPreviousPost] = useState<BlogPostResponse | null>(
    null
  );
  const [nextPost, setNextPost] = useState<BlogPostResponse | null>(null);

  useEffect(() => {
    if (currentPostDate) {
      client
        .getEntries({
          order: "fields.date",
          content_type: "blogPost",
          limit: 1,
          "fields.date[gt]": currentPostDate,
        })
        .then((response: { items: BlogPostResponse[] }) => {
          setNextPost(response.items[0]);
        });
      client
        .getEntries({
          order: "-fields.date",
          content_type: "blogPost",
          limit: 1,
          "fields.date[lt]": currentPostDate,
        })
        .then((response: { items: BlogPostResponse[] }) => {
          setPreviousPost(response.items[0]);
        });
    }
  }, [currentPostDate]);

  return { previousPost, nextPost };
}
