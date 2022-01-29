declare module "*.md" {
  const value: any;
  export default value;
}

declare module "*.mdx" {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}
