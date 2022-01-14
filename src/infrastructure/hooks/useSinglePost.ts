import { useEffect, useState } from "react";
import { BlogPost, BlogPostResponse } from "infrastructure/blog/types";

type Post = {
  post: BlogPost | null;
  isLoading: boolean;
  isEmpty: boolean;
};

export default function useSinglePost(category: string, slug: string): Post {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://antonettiserena-api.herokuapp.com/api/snippet/${category}/${slug}`)
      .then((res) => res.json())
      .then((blogPosts: BlogPostResponse[]) => {
        setPost(blogPosts[0]?.fields);
        setLoading(false);
        setIsEmpty(blogPosts.length === 0);
      })
      .catch(() => {
        setLoading(false);
        setIsEmpty(true);
      });
  }, [category, slug]);

  return { post, isLoading, isEmpty };
}
