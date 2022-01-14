import { useEffect, useState } from "react";
import {
  BlogPostResponse,
  NavigationBlogPosts,
} from "infrastructure/blog/types";

export const usePostNavigation = (
  category: string,
  slug: string
): NavigationBlogPosts => {
  const [previousPost, setPreviousPost] = useState<BlogPostResponse | null>(
    null
  );
  const [nextPost, setNextPost] = useState<BlogPostResponse | null>(null);

  useEffect(() => {
    setPreviousPost(null);
    setNextPost(null);

    fetch(`https://antonettiserena-api.herokuapp.com/api/snippet/${category}/${slug}/prev`)
      .then((res) => res.json())
      .then((response: BlogPostResponse[]) => {
        if (response[0]) {
          setPreviousPost(response[0]);
        }
      })
      .catch((error) => console.log(error));

    fetch(`https://antonettiserena-api.herokuapp.com/api/snippet/${category}/${slug}/next`)
      .then((res) => res.json())
      .then((response: BlogPostResponse[]) => {
        if (response[0]) {
          setNextPost(response[0]);
        }
      })
      .catch((error) => console.log(error));
  }, [category, slug]);

  return { previousPost, nextPost };
};

export default usePostNavigation;
