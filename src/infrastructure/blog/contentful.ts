import { BlogPostResponse } from "./types";

const accessToken = {
  publishedContent: "GqeJiNY-UxVwkklhiykW2NrYmGP-KemoktANslfrARA",
  draftContent: "esYP0oe6TIZxZkN5OElH6RDSL2aUOXC2aE11OR_w_cI",
};

const client = require("contentful").createClient({
  space: "idyoc1sdz1h5",
  accessToken: accessToken.publishedContent,
});

const getAllPosts = () =>
  client
    .getEntries({ order: "-sys.createdAt" })
    .then((response: { items: BlogPostResponse[] }) => response.items);

const getSinglePost = (category: string, slug: string) =>
  client
    .getEntries({
      "fields.slug": slug,
      "fields.category": category,
      content_type: "blogPost",
    })
    .then((response: { items: BlogPostResponse[] }) => response.items);

export { getAllPosts, getSinglePost };
