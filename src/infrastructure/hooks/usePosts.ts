import { useEffect, useState } from "react";
import { BlogPostResponse, BlogPosts } from "infrastructure/blog/types";

import { getAllPosts } from "infrastructure/blog/contentful";

type BlogPostFilters = {
  category?: string | null;
  subcategory?: string | null;
  tag?: string | null;
};

const promise = getAllPosts();

export default function usePosts({
  category,
  subcategory,
  tag,
}: BlogPostFilters): BlogPosts {
  const [posts, setPosts] = useState<BlogPostResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const shouldFilterByCategory = !!category;
    const shouldFilterBySubCategory = !!subcategory;
    const shouldFilterByTag = !!tag;

    promise.then((blogPosts: BlogPostResponse[]) => {
      const filteredPostsByCategory = shouldFilterByCategory
        ? blogPosts?.filter(
            (post: BlogPostResponse) => post.fields.category === category
          )
        : blogPosts;

      const filteredPostsBySubCategory = shouldFilterBySubCategory
        ? filteredPostsByCategory?.filter(
            (post: BlogPostResponse) => post.fields.subcategory === subcategory
          )
        : filteredPostsByCategory;

      const filteredPostsByTag = shouldFilterByTag
        ? filteredPostsBySubCategory?.filter((post: BlogPostResponse) =>
            post.fields.tags?.includes(tag)
          )
        : filteredPostsBySubCategory;

      setPosts(filteredPostsByTag);
      setLoading(false);
      setIsEmpty(filteredPostsByTag.length === 0);
    });
  }, []);

  return { posts, isLoading, isEmpty };
}
