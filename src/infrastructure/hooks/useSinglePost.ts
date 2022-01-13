import { useEffect, useState } from "react";
import { BlogPost, BlogPostResponse } from "infrastructure/blog/types";

import { getSinglePost } from "infrastructure/blog/contentful";

type Post = {
  post: BlogPost | null;
  isLoading: boolean;
  isEmpty: boolean;
};

export default function useSinglePost(category: string, slug: string): Post {
  const promise = getSinglePost(category, slug);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    promise.then((result: BlogPostResponse[]) => {
      setPost(result[0]?.fields);
      setLoading(false);
      setIsEmpty(result.length === 0);
    });
  }, []);

  return { post, isLoading, isEmpty };
}
