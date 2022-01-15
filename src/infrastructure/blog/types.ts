export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  tags?: string[];
  content: string;
  date: Date;
  topics?: string[];
  codeSandboxId?: string;
  codeSandboxSettings?: string;
  shortText?: string;
};

export type BlogPostMeta = {
  id: string;
};

export type BlogPostResponse = { fields: BlogPost; sys: BlogPostMeta };

export type BlogPosts = {
  posts: BlogPostResponse[];
  isLoading: boolean;
  isEmpty: boolean;
};

export type NavigationBlogPosts = {
  previousPost: BlogPostResponse | null;
  nextPost: BlogPostResponse | null;
};
