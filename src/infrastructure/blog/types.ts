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
  shortText?: string;
};

export type BlogPostResponse = { fields: BlogPost };

export type BlogPosts = {
  posts: BlogPostResponse[];
  isLoading: boolean;
  isEmpty: boolean;
};
