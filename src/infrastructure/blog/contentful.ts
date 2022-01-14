import { BlogPostResponse } from "./types";
import { accessToken, spaceId } from "./constants";

export const client = require("contentful").createClient({
  space: process.env.CONTENTFUL_SPACE_ID || spaceId,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN || accessToken.publishedContent,
});

const getPreviousPost = (currentPostDate: Date) =>
  client
    .getEntries({
      order: "fields.date",
      content_type: "blogPost",
      limit: 1,
      "fields.date[gt]": currentPostDate,
    })
    .then((response: { items: BlogPostResponse[] }) => response.items);

const getNextPost = (currentPostDate: Date) =>
  client
    .getEntries({
      order: "-fields.date",
      content_type: "blogPost",
      limit: 1,
      "fields.date[lt]": currentPostDate,
    })
    .then((response: { items: BlogPostResponse[] }) => response.items);

const getAllPosts = () =>
  client
    .getEntries({ order: "-fields.date", content_type: "blogPost" })
    .then((response: { items: BlogPostResponse[] }) => response.items);

const getSinglePost = (category: string, slug: string) =>
  client
    .getEntries({
      "fields.slug": slug,
      "fields.category": category,
      content_type: "blogPost",
    })
    .then((response: { items: BlogPostResponse[] }) => response.items);

export { getAllPosts, getSinglePost, getPreviousPost, getNextPost };
